from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import asyncio

from app.core.config import settings
from app.api.router import api_router
from app.models.database import db
from app.core.scheduler import start_scheduler, get_next_retraining_time

# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API for recommending music producers based on styles and specialties",
    version="1.0.0"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router)

# Scheduler task
scheduler_task = None

@app.on_event("startup")
async def startup_db_client():
    """Initialize database connection and start scheduler on startup"""
    global scheduler_task
    try:
        # Connect to database
        await db.connect_to_database()
        # Start the scheduler in a background task
        scheduler_task = start_scheduler()
    except Exception as e:
        print(f"Error during startup: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection and cancel scheduler on shutdown"""
    global scheduler_task
    
    # Close database connection
    await db.close_database_connection()
    
    # Cancel the scheduler task if it exists
    if scheduler_task:
        scheduler_task.cancel()
        try:
            await scheduler_task
        except asyncio.CancelledError:
            pass


@app.get("/", tags=["status"])
async def root():
    """API health check endpoint"""
    return {
        "status": "online",
        "message": "Music Producer Recommender API is running",
        "version": "1.0.0"
    }


@app.get("/health", tags=["status"])
async def health_check():
    """Detailed health check endpoint"""
    next_retraining = get_next_retraining_time()
    next_retraining_str = next_retraining.strftime("%Y-%m-%d %H:%M:%S") if next_retraining else None
    
    return {
        "status": "healthy",
        "database_connected": db.client is not None,
        "model_loaded": hasattr(app, "model") and app.model is not None,
        "next_model_retraining": next_retraining_str
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)