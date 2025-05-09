import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

async def test_mongodb_connection():
    # MongoDB connection string
    mongo_url = "mongodb+srv://mithila:1234@harmonix.sezj9.mongodb.net/?retryWrites=true&w=majority&appName=HarmoniX"
    db_name = "test"
    collection_name = "musicians"
    
    try:
        # Connect to MongoDB
        client = AsyncIOMotorClient(mongo_url)
        db = client[db_name]
        collection = db[collection_name]
        
        # Check connection by getting server info
        server_info = await client.server_info()
        print(f"Successfully connected to MongoDB version: {server_info.get('version')}")
        
        # Get count of all documents in collection
        total_docs = await collection.count_documents({})
        print(f"Total documents in {collection_name} collection: {total_docs}")
        
        # Count music producers
        producer_count = await collection.count_documents({"role": "Music Producer"})
        print(f"Music Producers found: {producer_count}")
        
        # Sample a music producer
        sample_producer = await collection.find_one({"role": "Music Producer"})
        if sample_producer:
            print("\nSample Music Producer data (key fields):")
            # Manually print relevant fields to avoid JSON serialization
            print(f"_id: {str(sample_producer.get('_id'))}")
            print(f"fullName: {sample_producer.get('fullName')}")
            print(f"email: {sample_producer.get('email')}")
            print(f"country: {sample_producer.get('country')}")
            print(f"role: {sample_producer.get('role')}")
            
            # Print relevant fields for model training
            print("\nRelevant fields for model training:")
            print(f"Genres: {sample_producer.get('genres', [])}")
            print(f"Skills: {sample_producer.get('skills', [])}")
            print(f"Tools: {sample_producer.get('tools', [])}")
            print(f"Tags: {sample_producer.get('tags', [])}")
            
            # List all available fields
            print("\nAll available fields:")
            for key in sample_producer.keys():
                if key != '_id':  # Skip _id as we've printed it already
                    print(f"{key}: {type(sample_producer[key])}")
        else:
            print("No Music Producers found in the collection")
            
    except Exception as e:
        print(f"Error connecting to MongoDB: {str(e)}")
    finally:
        # Close the connection
        client.close()
        print("\nConnection closed")

if __name__ == "__main__":
    # Run the async function
    asyncio.run(test_mongodb_connection())