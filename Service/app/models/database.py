from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase, AsyncIOMotorCollection
from typing import Dict, List, Any, Optional

from app.core.config import settings


class Database:
    """MongoDB database connection and operations"""
    
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None
    
    async def connect_to_database(self):
        """Connect to MongoDB database"""
        self.client = AsyncIOMotorClient(settings.MONGODB_URL)
        self.db = self.client[settings.MONGODB_DB_NAME]
        print(f"Connected to MongoDB at {settings.MONGODB_URL}")
    
    async def close_database_connection(self):
        """Close database connection"""
        if self.client:
            self.client.close()
            print("MongoDB connection closed")
    
    def get_collection(self, collection_name: str) -> AsyncIOMotorCollection:
        """Get MongoDB collection"""
        return self.db[collection_name]
    
    async def get_producers(self) -> List[Dict[str, Any]]:
        """Get all producers from database"""
        collection = self.get_collection(settings.PRODUCER_COLLECTION)
        producers = await collection.find({"role": "Music Producer"}).to_list(length=None)
        return producers
    
    async def get_producer_by_id(self, producer_id: str) -> Optional[Dict[str, Any]]:
        """Get producer by ID"""
        collection = self.get_collection(settings.PRODUCER_COLLECTION)
        producer = await collection.find_one({"_id": producer_id, "role": "Music Producer"})
        return producer
    
    async def get_producer_by_name(self, name: str) -> Optional[Dict[str, Any]]:
        """Get producer by name"""
        collection = self.get_collection(settings.PRODUCER_COLLECTION)
        producer = await collection.find_one({"name": name})
        return producer
    
    async def add_producer(self, producer_data: Dict[str, Any]) -> str:
        """Add a new producer to database"""
        collection = self.get_collection(settings.PRODUCER_COLLECTION)
        result = await collection.insert_one(producer_data)
        return str(result.inserted_id)
    
    async def update_producer(self, producer_id: str, producer_data: Dict[str, Any]) -> bool:
        """Update producer data"""
        collection = self.get_collection(settings.PRODUCER_COLLECTION)
        result = await collection.update_one(
            {"_id": producer_id},
            {"$set": producer_data}
        )
        return result.modified_count > 0
    
    async def delete_producer(self, producer_id: str) -> bool:
        """Delete producer from database"""
        collection = self.get_collection(settings.PRODUCER_COLLECTION)
        result = await collection.delete_one({"_id": producer_id})
        return result.deleted_count > 0


# Create database instance
db = Database()