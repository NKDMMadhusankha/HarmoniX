from fastapi import APIRouter, HTTPException, Path
from typing import Optional

from app.models.producer import ProducerResponse
from app.models.database import db

router = APIRouter()


@router.get("/producer/{producer_id}", response_model=ProducerResponse)
async def get_producer(
    producer_id: str = Path(..., title="The ID or name of the producer to get"),
):
    """
    Get details for a specific producer by ID or name
    """
    # Try to find by ID first
    producer = await db.get_producer_by_id(producer_id)
    
    # If not found by ID, try by name
    if not producer:
        producer = await db.get_producer_by_name(producer_id)
    
    if not producer:
        raise HTTPException(
            status_code=404,
            detail=f"Producer with ID or name '{producer_id}' not found"
        )
    
    # Convert MongoDB _id to string for response
    producer["id"] = str(producer.pop("_id"))
    return ProducerResponse(**producer)