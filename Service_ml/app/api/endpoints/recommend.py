from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from bson import ObjectId
import google.generativeai as genai
from google.api_core import exceptions
from pydantic import BaseModel

from app.models.producer import RecommendationRequest, RecommendationResponse, ProducerRecommendation
from app.models.ml_model import recommender_model
from app.models.database import db
from app.core.config import settings

router = APIRouter()

# New model for natural language query
class NaturalLanguageQuery(BaseModel):
    query: str

# Pydantic model for Gemini response
class QueryParameters(BaseModel):
    genres: List[str]
    skills: List[str]
    tools: Optional[List[str]] = None
    experience: Optional[str] = None

async def generate_recommendation_reason(producer_data, user_query, matching_genres):
    """
    Generate AI reasoning for why this producer is recommended based on the user's query
    """
    try:
        # Check if Gemini API key is configured
        if not settings.GEMINI_API_KEY:
            return None
            
        # Initialize Gemini API with the API key
        genai.configure(api_key=settings.GEMINI_API_KEY)
        
        # Extract producer details for the prompt
        producer_name = producer_data.get("fullName", "Unknown Producer")
        producer_genres = producer_data.get("genres", [])
        producer_skills = producer_data.get("skills", [])
        producer_tools = producer_data.get("tools", [])
        producer_experience = producer_data.get("experience", "")
        producer_country = producer_data.get("country", "")
        
        # Create the prompt for Gemini
        prompt = f"""
        You are a music producer recommendation expert. Your task is to explain why a specific music producer would be a good match for a user's request.
        
        User's query: "{user_query}"
        
        Producer details:
        - Name: {producer_name}
        - Genres: {', '.join(producer_genres)}
        - Skills: {', '.join(producer_skills)}
        - Tools: {', '.join(producer_tools if producer_tools else [])}
        - Experience: {producer_experience}
        - Country: {producer_country}
        
        The user's query matches the following genres: {', '.join(matching_genres)}
        
        Generate a concise, personalized explanation 30-60 words) for why this producer would be a good match for the user's needs.
        
        The response should:
        1. Highlight the producer's strengths related to the user's needs
        2. Mention specific matching genres/skills/tools
        3. Explain why this producer would be valuable for the user's specific project
        4. If the producer isn't a perfect match, acknowledge this but explain what value they still offer
        
        Your response should be friendly, direct, and specific to this producer and request.
        """
        
        # Generate the reasoning
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(
            contents=prompt,
            generation_config={
                "temperature": 0.7,
                "max_output_tokens": 200,
            }
        )
        
        # Return the generated text
        return response.text.strip()
        
    except Exception as e:
        print(f"Error generating recommendation reason: {str(e)}")
        return None

@router.post("/query", response_model=RecommendationResponse)
async def natural_language_recommendation(query: NaturalLanguageQuery):
    """
    Get producer recommendations using natural language query
    """
    try:
        # Process the natural language query with Gemini API
        print(f"Processing natural language query: {query.query}")
        
        # Check if Gemini API key is configured
        if not settings.GEMINI_API_KEY:
            raise HTTPException(
                status_code=500, 
                detail="Gemini API key not configured. Please set GEMINI_API_KEY in .env file."
            )
        
        # Get available genres, skills, and tools from the model metadata
        available_genres = []
        available_skills = []
        available_tools = []
        available_experience_levels = []
        
        if recommender_model.metadata:
            available_genres = recommender_model.metadata.get("all_genres", [])
            available_skills = recommender_model.metadata.get("all_skills", [])
            available_tools = recommender_model.metadata.get("all_tools", [])
            available_experience_levels = recommender_model.metadata.get("all_experience_levels", [])
        
        # Initialize Gemini API with the API key
        genai.configure(api_key=settings.GEMINI_API_KEY)
        
        # Create formatted lists for the prompt
        genres_list = ", ".join([f'"{genre}"' for genre in available_genres])
        skills_list = ", ".join([f'"{skill}"' for skill in available_skills])
        tools_list = ", ".join([f'"{tool}"' for tool in available_tools])
        experience_list = ", ".join([f'"{exp}"' for exp in available_experience_levels])
        
        # Create prompt that explains the task and context with examples
        prompt = f"""
        You are an expert music producer classifier. Your task is to analyze a user's description 
        of what they're looking for in a music producer and extract the relevant genres, skills, 
        tools, and experience level required.
        
        IMPORTANT: Only use values from the provided lists below. If something is mentioned in the query but doesn't
        match anything in these lists, find the closest match or omit it.
        
        Available genres: {genres_list}
        
        Available skills: {skills_list}
        
        Available tools: {tools_list}
        
        Available experience levels: {experience_list}
        
        For each category, only include values that are explicitly mentioned or strongly implied and exist in the available lists.
        If a category is not mentioned at all, provide an empty list or null.
        
        Here are some examples:
        
        Example 1:
        User query: "I need a jazz producer who is good at mixing and has experience with Logic Pro. They should have at least 3-5 years of experience."
        Response:
        {{
            "genres": ["Jazz"],
            "skills": ["Mixing"],
            "tools": ["Logic Pro"],
            "experience": "3-5 years"
        }}
        
        Example 2:
        User query: "Looking for someone who can produce EDM and trap music. They should be skilled in sound design and mastering."
        Response:
        {{
            "genres": ["EDM", "Trap"],
            "skills": ["Sound Design", "Mastering"],
            "tools": [],
            "experience": null
        }}
        
        Example 3:
        User query: "I want a producer for my indie folk album who knows how to record live instruments."
        Response:
        {{
            "genres": ["Indie", "Folk"],
            "skills": ["Live Recording"],
            "tools": [],
            "experience": null
        }}
        
        Now, analyze this user query: "{query.query}"
        
        Respond with a JSON object containing the following fields:
        - genres: List of music genres mentioned (ONLY from the available genres list)
        - skills: List of skills mentioned (ONLY from the available skills list)
        - tools: List of tools/software mentioned (ONLY from the available tools list)
        - experience: Experience level mentioned (ONLY from the available experience levels list)
        """
        
        # Generate structured response
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(
            contents=prompt,
            generation_config={
                "response_mime_type": "application/json",
            }
        )
        
        # Parse the response as JSON
        response_json = response.text
        import json
        extracted_params = json.loads(response_json)
        print(f"Extracted parameters: {extracted_params}")
        
        # Convert to proper structure
        params = QueryParameters(
            genres=extracted_params.get("genres", []),
            skills=extracted_params.get("skills", []),
            tools=extracted_params.get("tools", []),
            experience=extracted_params.get("experience")
        )
        
        # Ensure we have at least one genre or skill to search with
        if not params.genres and not params.skills:
            return RecommendationResponse(
                recommendations=[]
            )
        
        # Use the extracted parameters to get recommendations
        recommendations = recommender_model.recommend(
            genres=params.genres if params.genres else [],
            skills=params.skills if params.skills else [],
            tools=params.tools if params.tools else [],
            experience=params.experience,
            top_n=settings.TOP_N_RECOMMENDATIONS
        )
        
        if not recommendations:
            return RecommendationResponse(recommendations=[])
        
        # Fetch producer details from database
        result_recommendations = []
        for rec in recommendations:
            producer_id = rec["id"]
            print(f"Looking up producer with ID: {producer_id}")
            
            # Convert string ID to ObjectId if needed
            try:
                if not isinstance(producer_id, ObjectId) and ObjectId.is_valid(producer_id):
                    producer_id = ObjectId(producer_id)
            except Exception as e:
                print(f"Could not convert ID: {str(e)}")
            
            producer_data = await db.get_producer_by_id(producer_id)
            
            if producer_data:
                print(f"Found producer: {producer_data.get('fullName', '')}")
                
                # Process featuredTracks - handle both dictionary and string formats
                featured_tracks = producer_data.get("featuredTracks", [])
                processed_tracks = []
                
                if featured_tracks:
                    try:
                        # Check if we have a list of dictionaries
                        if isinstance(featured_tracks, list):
                            for track in featured_tracks:
                                if isinstance(track, dict):
                                    # For dictionary format, create a string representation
                                    title = track.get('title', 'Unknown Track')
                                    artist = track.get('artist', 'Unknown Artist')
                                    processed_tracks.append(f"{artist} - {title}")
                                else:
                                    # If it's already a string, use it as is
                                    processed_tracks.append(track)
                    except Exception as e:
                        print(f"Error processing featured tracks for {producer_data.get('fullName', '')}: {str(e)}")
                        # Use empty list if there's an error
                        processed_tracks = []
                
                try:
                    # Generate AI reasoning for this recommendation
                    reason = await generate_recommendation_reason(
                        producer_data=producer_data,
                        user_query=query.query,
                        matching_genres=rec.get("matching_genres", [])
                    )
                    
                    # Create a ProducerRecommendation object with all fields
                    result_recommendations.append(
                            ProducerRecommendation(
                                id=str(producer_id),
                                fullName=producer_data.get("fullName", ""),
                                similarity_score=rec["similarity_score"],
                                genres=producer_data.get("genres"),
                                skills=producer_data.get("skills"),
                                experience=producer_data.get("experience"),
                                profileImage=producer_data.get("profileImage"),
                                country=producer_data.get("country"),
                                about=producer_data.get("about"),
                                tools=producer_data.get("tools"),
                                featuredTracks=processed_tracks,
                                reason=reason
                            )
                        )                    
                except Exception as e:
                    print(f"Error creating recommendation for {producer_data.get('fullName', '')}: {str(e)}")
                    # Continue to the next producer if we can't create a recommendation for this one
                    continue
        
        # In case no recommendations were found
        if not result_recommendations:
            # Log all available genres for debugging
            all_genres = []
            if recommender_model.metadata and "all_genres" in recommender_model.metadata:
                all_genres = recommender_model.metadata["all_genres"]
            print(f"No recommendations found. Available genres in database: {all_genres}")
            
            # If we have genres but no matches, try a more flexible approach as fallback
            if params.genres and not recommendations:
                print("Attempting fallback recommendation with broader criteria...")
                # Try to match with just the first genre and no other criteria
                if params.genres:
                    fallback_recommendations = recommender_model.recommend(
                        genres=[params.genres[0]],
                        skills=[],
                        tools=[],
                        experience=None,
                        top_n=settings.TOP_N_RECOMMENDATIONS
                    )
                    
                    # Process the fallback recommendations
                    if fallback_recommendations:
                        print(f"Found {len(fallback_recommendations)} fallback recommendations")
                        # ... (reuse your existing code to process recommendations)
        
        # Debug the available genres
        all_genres = []
        if recommender_model.metadata and "all_genres" in recommender_model.metadata:
            all_genres = recommender_model.metadata["all_genres"]
        print(f"Available genres in database: {all_genres}")
        
        return RecommendationResponse(recommendations=result_recommendations)
    
    except exceptions.GoogleAPIError as api_error:
        print(f"Gemini API error: {str(api_error)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing query with Gemini API: {str(api_error)}"
        )
    except Exception as e:
        import traceback
        print(f"Error processing natural language query: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Error processing query: {str(e)}"
        )