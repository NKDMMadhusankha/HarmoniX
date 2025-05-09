from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class ProducerBase(BaseModel):
    """Base producer model"""
    fullName: str
    genres: List[str]
    skills: List[str]
    experience: Optional[str] = None
    tools: Optional[List[str]] = None
    about: Optional[str] = None
    email: Optional[str] = None
    phoneNumber: Optional[str] = None
    country: Optional[str] = None
    profileImage: Optional[str] = None
    tags: Optional[List[str]] = None
    featuredTracks: Optional[List[str]] = None
    reason: Optional[str] = None  # AI-generated reasoning for this recommendation


class ProducerDB(ProducerBase):
    """Producer model with MongoDB ID field"""
    id: str = Field(..., alias="_id")

    model_config = ConfigDict(
        populate_by_name=True,
        json_schema_extra={
            "example": {
                "_id": "68074bba2ef8a1eb37630127",
                "fullName": "Billy Fernando",
                "genres": ["Jazz", "Indie", "classic"],
                "skills": ["Music Producing", "Sound Designing", "Dancing"],
                "experience": "1-2 years",
                "tools": ["Cubase", "Protools", "UAD"],
                "about": "Experienced producer specializing in jazz and indie music.",
                "email": "billy@gmail.com",
                "phoneNumber": "7123115858",
                "country": "Sri Lanka",
                "profileImage": "68074bba2ef8a1eb37630127/profile/",
                "tags": ["Music Producer", "Music Derector", "Sound Designer"]
            }
        }
    )


class ProducerCreate(ProducerBase):
    """Producer model for creation requests"""
    pass


class ProducerResponse(ProducerBase):
    """Producer model for API responses"""
    id: str

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "id": "68074bba2ef8a1eb37630127",
                "fullName": "Billy Fernando",
                "genres": ["Jazz", "Indie", "classic"],
                "skills": ["Music Producing", "Sound Designing", "Dancing"],
                "experience": "1-2 years",
                "tools": ["Cubase", "Protools", "UAD"],
                "about": "Experienced producer specializing in jazz and indie music.",
                "email": "billy@gmail.com",
                "phoneNumber": "7123115858",
                "country": "Sri Lanka",
                "profileImage": "68074bba2ef8a1eb37630127/profile/",
                "tags": ["Music Producer", "Music Derector", "Sound Designer"]
            }
        }
    )


class RecommendationRequest(BaseModel):
    """Request model for producer recommendations"""
    genres: List[str]
    skills: List[str]
    tools: Optional[List[str]] = None
    experience: Optional[str] = None
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "genres": ["Jazz", "Indie"],
                "skills": ["Music Producing", "Sound Designing"],
                "tools": ["Cubase"],
                "experience": "1-2 years"
            }
        }
    )


class ProducerRecommendation(BaseModel):
    """Model for a single producer recommendation"""
    id: str
    fullName: str
    similarity_score: float
    genres: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    experience: Optional[str] = None
    profileImage: Optional[str] = None
    country: Optional[str] = None
    about: Optional[str] = None
    tools: Optional[List[str]] = None
    featuredTracks: Optional[List[str]] = None
    reason: Optional[str] = None

class RecommendationResponse(BaseModel):
    """Response model for producer recommendations"""
    recommendations: List[ProducerRecommendation]
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "recommendations": [
                    {
                        "id": "68074bba2ef8a1eb37630127",
                        "fullName": "Billy Fernando",
                        "similarity_score": 0.95,
                        "genres": ["Jazz", "Indie", "classic"],
                        "skills": ["Music Producing", "Sound Designing", "Dancing"],
                        "experience": "1-2 years",
                        "profileImage": "68074bba2ef8a1eb37630127/profile/",
                        "country": "Sri Lanka",
                        "about": "Experienced producer specializing in jazz and indie music.",
                        "tools": ["Cubase", "Protools", "UAD"],
                        "featuredTracks": ["Artist1 - Song1", "Artist2 - Song2"],
                        "reason": "Billy Fernando would be an excellent match for your jazz project. With specialized experience in both Jazz and Indie genres, he brings strong sound designing skills that align perfectly with your requirements. His proficiency with industry-standard tools like Protools and Cubase ensures professional-quality production. Based in Sri Lanka, Billy offers a unique perspective that could add distinctive elements to your music, making him an ideal collaborator for your project."
                    }
                ]
            }
        }
    )

class TrainingResponse(BaseModel):
    """Response model for model training"""
    success: bool
    message: str
    details: Optional[Dict[str, Any]] = None
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "success": True,
                "message": "Model trained successfully",
                "details": {
                    "accuracy": 0.92,
                    "training_time": "2.5 seconds",
                    "model_version": "20230501_120000"
                }
            }
        }
    )