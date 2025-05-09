from fastapi import APIRouter, HTTPException, Depends
from typing import Optional

from app.models.producer import TrainingResponse
from app.models.ml_model import recommender_model
from app.models.database import db
from app.core.config import settings

router = APIRouter()


@router.post("/train", response_model=TrainingResponse)
async def train_model():
    """
    Train the recommendation model with the latest producer data
    """
    try:
        # Get all producers from database
        producers = await db.get_producers()
        
        if not producers or len(producers) < 5:
            return TrainingResponse(
                success=False,
                message="Not enough data to train model. Minimum 5 producers required.",
                details={"producers_count": len(producers) if producers else 0}
            )
        
        # Train the model
        training_result = await recommender_model.train(producers)
        
        if not training_result["success"]:
            return TrainingResponse(
                success=False,
                message=training_result["message"],
                details=training_result.get("details")
            )
        
        return TrainingResponse(
            success=True,
            message=f"Model trained successfully with {len(producers)} producers",
            details=training_result["details"]
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error training model: {str(e)}"
        )