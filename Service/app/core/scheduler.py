import asyncio
import schedule
import logging
from datetime import datetime

from app.models.ml_model import recommender_model
from app.models.database import db

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def retrain_model():
    """Scheduled task to retrain the recommendation model monthly"""
    try:
        logger.info("Starting scheduled model retraining")
        
        # Get all producers from database
        producers = await db.get_producers()
        
        if not producers or len(producers) < 5:
            logger.warning(f"Not enough producers to train model. Found {len(producers) if producers else 0} producers.")
            return False
        
        # Use the existing train method from recommender_model
        result = await recommender_model.train(producers)
        
        if result["success"]:
            logger.info(f"Model retrained successfully with {len(producers)} producers")
            logger.info(f"Training details: {result['details']}")
        else:
            logger.error(f"Failed to retrain model: {result['message']}")
        
        return result["success"]
    
    except Exception as e:
        logger.error(f"Error during model retraining: {str(e)}")
        return False

# Create a wrapper function to run the async function
def run_retrain():
    """
    Wrapper function to execute the async retrain_model function
    Only runs on the 1st day of the month for monthly retraining
    """
    # Only run on the 1st day of the month
    if datetime.now().day == 1:
        logger.info("It's the 1st day of the month - executing scheduled model retraining")
        # Get the current event loop and create the task
        try:
            loop = asyncio.get_event_loop()
            if loop.is_running():
                # If the loop is already running (normal case in FastAPI)
                asyncio.create_task(retrain_model())
            else:
                # Fallback in case the loop isn't running
                loop.run_until_complete(retrain_model())
        except Exception as e:
            logger.error(f"Error executing scheduled retraining: {str(e)}")
    else:
        logger.debug("Not the 1st day of the month - skipping retraining")

async def scheduler_loop():
    """Run the scheduler loop to check for pending jobs"""
    logger.info("Scheduler loop started")
    while True:
        try:
            # Check for scheduled jobs
            schedule.run_pending()
            # Wait for the next minute before checking again
            await asyncio.sleep(60)
        except Exception as e:
            logger.error(f"Error in scheduler loop: {str(e)}")
            await asyncio.sleep(300)  # Wait 5 minutes before retrying if there's an error

def start_scheduler():
    """Start the scheduler with monthly retraining"""
    try:
        logger.info("Starting the task scheduler")
        schedule.every().day.at("00:00").do(run_retrain)
        logger.info("Model retraining scheduled for the 1st day of each month at 00:00")
        return asyncio.create_task(scheduler_loop())
    except Exception as e:
        logger.error(f"Error starting scheduler: {e}")
        return None

def get_next_retraining_time():
    """Get the next scheduled retraining time and adjusted to show monthly"""
    for job in schedule.jobs:
        if "run_retrain" in str(job.job_func):
            next_run = job.next_run
            
            # If today is past the 1st of the month, adjust to show next month's 1st
            if next_run.day != 1 and datetime.now().day > 1:
                # Move to next month's 1st day
                if next_run.month == 12:
                    next_month = 1
                    next_year = next_run.year + 1
                else:
                    next_month = next_run.month + 1
                    next_year = next_run.year
                
                next_run = datetime(
                    year=next_year,
                    month=next_month,
                    day=1,
                    hour=0,
                    minute=0,
                    second=0
                )
                
            return next_run
    return None