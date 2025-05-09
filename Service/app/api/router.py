from fastapi import APIRouter

from app.api.endpoints import recommend, producer, train
from app.core.config import settings

# Create main API router
api_router = APIRouter(prefix=settings.API_V1_STR)

# Include endpoint routers
api_router.include_router(recommend.router, tags=["recommendations"])
api_router.include_router(producer.router, tags=["producers"])
api_router.include_router(train.router, tags=["model training"])