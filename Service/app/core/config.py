import os
from typing import Optional
from pydantic_settings import BaseSettings
from pydantic import Field, ConfigDict


class Settings(BaseSettings):
    """Application settings configuration"""
    
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Music Producer Recommender API"
    
    # MongoDB Configuration
    MONGODB_URL: str = Field("mongodb+srv://mithila:1234@harmonix.sezj9.mongodb.net/?retryWrites=true&w=majority&appName=HarmoniX", env="MONGODB_URL")
    MONGODB_DB_NAME: str = Field("test", env="MONGODB_DB_NAME")
    PRODUCER_COLLECTION: str = "musicians"
    
    # ML Model Configuration
    MODEL_PATH: str = Field("./model/producer_recommender_model.pkl")
    MODEL_METADATA_PATH: str = Field("./model/model_metadata.json")
    TOP_N_RECOMMENDATIONS: int = 3
    
    # Gemini API Configuration
    GEMINI_API_KEY: str = Field("", env="GEMINI_API_KEY")
    
    # Security Configuration (if needed)
    API_KEY: Optional[str] = Field(None, env="API_KEY")
    
    # Use the new model_config approach instead of inner Config class
    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=True
    )


settings = Settings()