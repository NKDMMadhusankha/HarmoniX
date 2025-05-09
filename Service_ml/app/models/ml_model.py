import os
import json
import time
import numpy as np
import pandas as pd
from typing import List, Dict, Any, Tuple, Optional
from datetime import datetime
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MultiLabelBinarizer, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
import joblib

from app.core.config import settings


class ProducerRecommenderModel:
    """Machine learning model for recommending music producers"""
    
    def __init__(self):
        self.model = None
        self.metadata = None
        self.genre_mlb = None
        self.skill_mlb = None
        self.tool_mlb = None
        self.feature_matrix = None
        self.producer_ids = None
        self._load_model()
    
    def _load_model(self) -> bool:
        """Load the trained model and metadata from disk"""
        try:
            if os.path.exists(settings.MODEL_PATH) and os.path.exists(settings.MODEL_METADATA_PATH):
                self.model = joblib.load(settings.MODEL_PATH)
                with open(settings.MODEL_METADATA_PATH, "r") as f:
                    self.metadata = json.load(f)
                print("Model loaded successfully")
                return True
            else:
                print("Model files not found.")
                return False
        except Exception as e:
            print(f"Error loading model: {e}")
            return False
    
    async def train(self, producers: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Train a new model using producer data"""
        try:
            start_time = time.time()
            
            # Extract only the fields we need for training
            producer_data = []
            for p in producers:
                producer_data.append({
                    "_id": str(p["_id"]),
                    "fullName": p.get("fullName", ""),
                    "genres": p.get("genres", []),
                    "skills": p.get("skills", []),
                    "tools": p.get("tools", []),
                    "experience": p.get("experience", "")
                })
            
            # Convert to DataFrame
            df = pd.DataFrame(producer_data)
            
            # Extract all unique values for each feature
            all_genres = set()
            all_skills = set()
            all_tools = set()
            all_experience_levels = set()
            
            for producer in producer_data:
                all_genres.update(producer["genres"])
                all_skills.update(producer["skills"])
                all_tools.update(producer["tools"])
                all_experience_levels.add(producer["experience"])
            
            all_genres = sorted(list(all_genres))
            all_skills = sorted(list(all_skills))
            all_tools = sorted(list(all_tools))
            all_experience_levels = sorted(list(filter(None, all_experience_levels)))
            
            # Create binary features for list fields
            genre_mlb = MultiLabelBinarizer(classes=all_genres)
            skill_mlb = MultiLabelBinarizer(classes=all_skills)
            tool_mlb = MultiLabelBinarizer(classes=all_tools)
            
            # Ensure all fields are properly formatted
            df["genres"] = df["genres"].apply(lambda x: x if isinstance(x, list) else [])
            df["skills"] = df["skills"].apply(lambda x: x if isinstance(x, list) else [])
            df["tools"] = df["tools"].apply(lambda x: x if isinstance(x, list) else [])
            
            # Transform features
            genre_features = genre_mlb.fit_transform(df["genres"])
            skill_features = skill_mlb.fit_transform(df["skills"])
            tool_features = tool_mlb.fit_transform(df["tools"])
            
            # Feature Weighting: Genres and skills are 2x more important than tools
            genre_features = genre_features * 2.0
            skill_features = skill_features * 2.0
            
            # Create feature matrix by combining all features
            X = np.hstack((genre_features, skill_features, tool_features))
            
            # If we have experience data, add it as one-hot encoded features
            if all_experience_levels:
                # Create a mapping for experience levels
                exp_mapping = {level: i for i, level in enumerate(all_experience_levels)}
                # Map experience to numerical values, with missing values set to -1
                df["experience_num"] = df["experience"].map(lambda x: exp_mapping.get(x, -1))
                # One-hot encode experience
                exp_encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
                exp_features = exp_encoder.fit_transform(df[["experience_num"]])
                # Add to feature matrix
                X = np.hstack((X, exp_features))
            
            # Target is the index, which we'll map back to producer IDs
            producer_ids = df["_id"].tolist()
            producer_names = df["fullName"].tolist()
            
            # Compute nearest neighbor indices using cosine similarity
            # We're using NearestNeighbors instead of KNN for more flexibility
            n_neighbors = min(11, len(producer_ids))  # Include the producer itself + up to 10 neighbors
            model = NearestNeighbors(n_neighbors=n_neighbors, metric='cosine', algorithm='brute')
            model.fit(X)
            
            # Evaluate model by computing average neighbor similarity for each producer
            distances, indices = model.kneighbors(X)
            
            # Compute similarity (1 - distance) and take average excluding self (first entry)
            avg_similarities = []
            for i in range(len(X)):
                # Skip the first element (self) in similarity calculation
                similarities = 1 - distances[i][1:] if distances[i][0] < 1e-6 else 1 - distances[i]
                avg_similarities.append(np.mean(similarities))
            
            avg_similarity = np.mean(avg_similarities)
            
            # Create model directory if it doesn't exist
            os.makedirs(os.path.dirname(settings.MODEL_PATH), exist_ok=True)
            
            # Save model with timestamp
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            
            # Save model
            joblib.dump(model, settings.MODEL_PATH)
            
            # Save metadata
            metadata = {
                "all_genres": all_genres,
                "all_skills": all_skills,
                "all_tools": all_tools,
                "all_experience_levels": all_experience_levels,
                "producer_ids": producer_ids,
                "producer_names": producer_names,
                "feature_matrix": X.tolist(),  # Store feature matrix for similarity calculations
                "training_date": timestamp,
                "dataset_size": len(producers),
                "avg_similarity": float(avg_similarity),
                "n_neighbors": n_neighbors
            }
            
            with open(settings.MODEL_METADATA_PATH, "w") as f:
                json.dump(metadata, f)
            
            # Update instance variables
            self.model = model
            self.metadata = metadata
            self.genre_mlb = genre_mlb
            self.skill_mlb = skill_mlb
            self.tool_mlb = tool_mlb
            self.feature_matrix = X
            self.producer_ids = producer_ids
            
            training_time = time.time() - start_time
            
            return {
                "success": True,
                "message": "Model trained successfully",
                "details": {
                    "average_similarity": round(avg_similarity, 4),
                    "training_time": f"{training_time:.2f} seconds",
                    "model_version": timestamp,
                    "dataset_size": len(producers),
                    "n_neighbors": n_neighbors
                }
            }
            
        except Exception as e:
            return {
                "success": False,
                "message": f"Error training model: {str(e)}",
                "details": None
            }
    
    def recommend(self, genres: List[str], skills: List[str], tools: List[str] = None, 
                  experience: str = None, top_n: int = 3) -> List[Dict[str, Any]]:
        """
        Recommend producers based on genres, skills, tools and experience
        Ensures that all recommended producers match at least one requested genre
        """
        if not self.metadata:
            print("No metadata available. Please train the model first.")
            return []
        
        try:
            print(f"Starting recommendation with: genres={genres}, skills={skills}, tools={tools}, experience={experience}")
            
            # Extract the producers' data from metadata
            if "feature_matrix" not in self.metadata:
                print("Feature matrix not found in metadata")
                return []
            
            feature_matrix = np.array(self.metadata["feature_matrix"])
            producer_ids = self.metadata["producer_ids"]
            producer_names = self.metadata.get("producer_names", [""] * len(producer_ids))
            all_genres = self.metadata["all_genres"]
            
            print(f"Loaded data for {len(producer_ids)} producers")
            
            # Step 1: Find producers that match at least one of the requested genres
            genre_matching_producers = []
            
            # Get indices for each producer that has any of the requested genres
            for i, producer_id in enumerate(producer_ids):
                producer_genres = []
                
                # Extract producer's genres directly from features
                for j, genre in enumerate(all_genres):
                    # Genre features were multiplied by 2.0 during training
                    if feature_matrix[i, j] > 1.9:  # Allow for small floating point differences
                        producer_genres.append(genre)
                
                # Check if producer has any of the requested genres
                matching_genres = [g for g in genres if g in producer_genres]
                
                if matching_genres:
                    genre_matching_producers.append({
                        "id": producer_id,
                        "name": producer_names[i] if i < len(producer_names) else "",
                        "index": i,
                        "matching_genres": matching_genres
                    })
            
            print(f"Found {len(genre_matching_producers)} producers matching at least one requested genre")
            
            # If we don't have enough genre-matching producers, issue a warning but continue
            if len(genre_matching_producers) < top_n:
                print(f"WARNING: Only found {len(genre_matching_producers)} producers matching the requested genres")
            
            if not genre_matching_producers:
                print("No producers match any of the requested genres")
                return []
            
            # Step 2: Among genre-matching producers, calculate similarity based on all criteria
            # Create feature vector for the request
            query_vector = np.zeros(feature_matrix.shape[1])
            
            # Set genre features (with weight 2.0)
            for genre in genres:
                if genre in all_genres:
                    genre_idx = all_genres.index(genre)
                    query_vector[genre_idx] = 2.0
            
            # Set skill features (with weight 2.0)
            skill_offset = len(all_genres)
            all_skills = self.metadata["all_skills"]
            for skill in skills:
                if skill in all_skills:
                    skill_idx = all_skills.index(skill)
                    query_vector[skill_offset + skill_idx] = 2.0
            
            # Set tool features (with weight 1.0)
            tool_offset = skill_offset + len(all_skills)
            all_tools = self.metadata["all_tools"]
            if tools:
                for tool in tools:
                    if tool in all_tools:
                        tool_idx = all_tools.index(tool)
                        query_vector[tool_offset + tool_idx] = 1.0
            
            # Set experience feature (with weight 1.0)
            if "all_experience_levels" in self.metadata and experience:
                exp_offset = tool_offset + len(all_tools)
                all_exp = self.metadata["all_experience_levels"]
                if experience in all_exp:
                    exp_idx = all_exp.index(experience)
                    query_vector[exp_offset + exp_idx] = 1.0
            
            # Calculate similarity for each genre-matching producer
            for producer in genre_matching_producers:
                producer_vector = feature_matrix[producer["index"]]
                
                # Calculate cosine similarity
                dot_product = np.dot(query_vector, producer_vector)
                query_norm = np.linalg.norm(query_vector)
                producer_norm = np.linalg.norm(producer_vector)
                
                if query_norm > 0 and producer_norm > 0:
                    similarity = dot_product / (query_norm * producer_norm)
                else:
                    similarity = 0
                    
                # Boost similarity based on number of matching genres
                genre_match_boost = len(producer["matching_genres"]) / len(genres)
                
                # Final score combines similarity with genre match boost
                producer["similarity_score"] = float(similarity * (1 + genre_match_boost))
            
            # Sort by similarity score
            genre_matching_producers.sort(key=lambda x: x["similarity_score"], reverse=True)
            
            # Return top N recommendations
            recommendations = []
            for producer in genre_matching_producers[:top_n]:
                recommendations.append({
                    "id": producer["id"],
                    "name": producer["name"],
                    "similarity_score": producer["similarity_score"],
                    "matching_genres": producer["matching_genres"]
                })
                print(f"Recommending: {producer['name']} (ID: {producer['id']}) with score {producer['similarity_score']:.4f}")
                print(f"  Matching genres: {producer['matching_genres']}")
            
            return recommendations
            
        except Exception as e:
            import traceback
            print(f"Error in recommendation: {str(e)}")
            print(traceback.format_exc())
            return []


# Create model instance
recommender_model = ProducerRecommenderModel()