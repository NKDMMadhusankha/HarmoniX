import asyncio
import random
import time
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import hashlib
import uuid

# MongoDB connection details
MONGO_URL = "mongodb+srv://mithila:1234@harmonix.sezj9.mongodb.net/?retryWrites=true&w=majority&appName=HarmoniX"
DB_NAME = "test"
COLLECTION_NAME = "musicians"

# Define cultural groups with matching first and last names
cultural_groups = [
    {
        "name": "Western",
        "first_names": [
            "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", 
            "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica"
        ],
        "last_names": [
            "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", 
            "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin"
        ],
        "countries": ["United States", "United Kingdom", "Canada", "Australia"]
    },
    {
        "name": "Sri Lankan",
        "first_names": [
            "Saman", "Kumara", "Indika", "Chaminda", "Nuwan", "Dinesh", "Ruwan", "Kasun",
            "Malini", "Chamari", "Nilmini", "Dilini", "Anusha", "Kumari", "Chathurika", "Madhavi"
        ],
        "last_names": [
            "Fernando", "Perera", "Silva", "Jayawardene", "Bandara", "Rajapaksa", 
            "Dissanayake", "Senanayake", "Gunawardena", "Wickramasinghe"
        ],
        "countries": ["Sri Lanka"]
    },
    {
        "name": "Indian",
        "first_names": [
            "Raj", "Aditya", "Vikram", "Sunil", "Rajesh", "Amit", "Rahul", "Sanjay", 
            "Ananya", "Priya", "Nisha", "Deepa", "Sunita", "Anjali", "Pooja", "Meera"
        ],
        "last_names": [
            "Patel", "Kumar", "Singh", "Shah", "Sharma", "Gupta", "Mehta", "Verma", 
            "Reddy", "Das", "Agarwal", "Joshi", "Rao", "Malhotra", "Chopra", "Kapoor"
        ],
        "countries": ["India"]
    },
    {
        "name": "Chinese",
        "first_names": [
            "Wei", "Jie", "Ming", "Feng", "Hui", "Chen", "Zhi", "Xiang",
            "Xiu", "Li", "Yan", "Mei", "Jin", "Ying", "Qing", "Hong"
        ],
        "last_names": [
            "Wang", "Li", "Zhang", "Liu", "Chen", "Yang", "Huang", "Zhao", "Wu", "Zhou"
        ],
        "countries": ["China", "Taiwan", "Hong Kong", "Singapore"]
    },
    {
        "name": "Japanese",
        "first_names": [
            "Haruto", "Yuto", "Sota", "Yuki", "Haruki", "Akira", "Hiroshi", "Takeshi",
            "Yumiko", "Sakura", "Aiko", "Yui", "Hina", "Mio", "Yuna", "Rin"
        ],
        "last_names": [
            "Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", 
            "Yamamoto", "Nakamura", "Kobayashi", "Kato"
        ],
        "countries": ["Japan"]
    },
    {
        "name": "Korean",
        "first_names": [
            "Min-jun", "Seo-jun", "Do-yoon", "Ji-woo", "Jun-ho", "Ji-hoon", "Hyun-woo", "Jae-min",
            "Seo-yeon", "Ji-yu", "Ha-eun", "Ye-jin", "Min-seo", "Ji-min", "Su-bin", "Ji-eun"
        ],
        "last_names": [
            "Kim", "Lee", "Park", "Choi", "Jung", "Kang", "Cho", "Yoon", "Jang", "Lim"
        ],
        "countries": ["South Korea"]
    },
    {
        "name": "Russian",
        "first_names": [
            "Mikhail", "Ivan", "Dmitri", "Alexei", "Nikolai", "Sergei", "Vladimir", "Andrei",
            "Natasha", "Anastasia", "Olga", "Tatiana", "Elena", "Irina", "Svetlana", "Maria"
        ],
        "last_names": [
            "Ivanov", "Petrov", "Smirnov", "Kuznetsov", "Popov", "Sokolov", 
            "Lebedev", "Kozlov", "Novikov", "Morozov"
        ],
        "countries": ["Russia"]
    },
    {
        "name": "Middle Eastern",
        "first_names": [
            "Ali", "Mohammed", "Ahmed", "Omar", "Yusuf", "Hassan", "Ibrahim", "Mustafa",
            "Fatima", "Aisha", "Zainab", "Leila", "Mariam", "Amina", "Noor", "Sara"
        ],
        "last_names": [
            "Al-Farsi", "El-Masri", "Al-Saud", "Khan", "Hassan", "Al-Khalifa", 
            "Farooq", "Karim", "Mustafa", "Al-Zahrani"
        ],
        "countries": ["Saudi Arabia", "UAE", "Iran", "Egypt", "Turkey", "Morocco"]
    }
]

genres = [
    # Western music genres
    "Jazz", "Hip-Hop", "R&B", "Pop", "Rock", "EDM", "Classical", "Country", "Folk", "Indie",
    "Metal", "Punk", "Blues", "Reggae", "Soul", "Funk", "Techno", "House", "Ambient", "Lo-fi",
    "Trap", "Dubstep", "Drill", "Gospel", "Latin", "Afrobeat", "K-pop", "J-pop", "Disco", "Synthwave",
    
    # World music genres
    "Bollywood", "Carnatic", "Hindustani", "Bhangra", "Filmi",  # Indian
    "Traditional Chinese", "C-pop", "Guoyue",  # Chinese
    "Enka", "City Pop", "Shibuya-kei",  # Japanese
    "Trot", "Korean Traditional",  # Korean
    "Russian Folk", "Chanson",  # Russian
    "Rai", "Chaabi", "Gnawa",  # Middle Eastern/North African
    "Baila", "Sinhala Pop"  # Sri Lankan
]

skills = [
    "Music Producing", "Sound Designing", "Mixing", "Mastering", "Vocal Producing", "Arranging", 
    "Orchestration", "Beat Making", "Composition", "Sound Engineering",
    "Songwriting", "Vocal Coaching", "Live Recording", "MIDI Programming", "Remixing",
    "Sound Effects", "Film Scoring", "Synthesizer Programming", "Drum Programming", "Session Playing",
    "Audio Restoration", "Foley Artist", "Sound Sampling", "Improvisation", "Conducting",
    "Finger Drumming", "Looping", "Turntablism", "Instrument Recording", "Digital Audio Editing",
    "World Music Production", "Traditional Instrument Recording", "Cultural Fusion", "Folk Arrangement",
    "Ethnic Sampling", "Regional Style Production", "Indigenous Music Recording"
]

tools = [
    "Ableton Live", "FL Studio", "Logic Pro", "Pro Tools", "Cubase", "Reason", "Studio One", "GarageBand",
    "Bitwig Studio", "Reaper", "Nuendo", "Digital Performer", "Audacity", "Audition", "LMMS",
    "Maschine", "MPC", "Akai Force", "Native Instruments Komplete", "Arturia V Collection",
    "UAD Plugins", "Waves Plugins", "FabFilter", "iZotope", "Soundtoys",
    "Serum", "Massive", "Omnisphere", "Kontakt", "Reaktor"
]

tags = [
    "Music Producer", "Beat Maker", "Sound Designer", "Mixing Engineer", "Mastering Engineer",
    "Sound Engineer", "Recording Engineer", "Sound Artist", "Audio Engineer", "Composer",
    "Songwriter", "Arranger", "Multi-Instrumentalist", "Audio Professional", "Studio Owner",
    "Performer", "Producer/DJ", "Musician", "Remixer", "Synthesist",
    "World Music Specialist", "Cultural Music Producer", "Traditional Musician", "Fusion Producer",
    "Ethnic Music Producer", "Regional Music Expert", "Indigenous Music Producer"
]

experience_levels = [
    "0-1 years", "1-2 years", "2-3 years", "3-5 years", "5-10 years", "10+ years"
]

# Function to generate a culturally consistent name
def get_cultural_name():
    # Select a random cultural group
    group = random.choice(cultural_groups)
    
    # Get random first and last name from the same cultural group
    first_name = random.choice(group["first_names"])
    last_name = random.choice(group["last_names"])
    
    # Get a country from the cultural group
    country = random.choice(group["countries"])
    
    return first_name, last_name, country

# Function to generate a random producer with a truly unique ID
def generate_random_producer():
    # Get culturally consistent name and country
    first_name, last_name, country = get_cultural_name()
    full_name = f"{first_name} {last_name}"
    
    # Create a unique ID using UUID + timestamp to ensure uniqueness
    unique_str = f"{full_name}_{uuid.uuid4()}_{time.time()}"
    id_hash = hashlib.md5(unique_str.encode()).hexdigest()
    producer_id = ObjectId(id_hash[:24])
    
    # Create unique email and user ID
    email = f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 999)}@example.com"
    user_id = hashlib.sha256(email.encode()).hexdigest()[:32]
    
    # Generate a random number of genres (1-4)
    num_genres = random.randint(1, 4)
    producer_genres = random.sample(genres, num_genres)
    
    # Generate a random number of skills (2-6)
    num_skills = random.randint(2, 6)
    producer_skills = random.sample(skills, num_skills)
    
    # Generate a random number of tools (1-5)
    num_tools = random.randint(1, 5)
    producer_tools = random.sample(tools, num_tools)
    
    # Generate a random number of tags (1-3)
    num_tags = random.randint(1, 3)
    producer_tags = random.sample(tags, num_tags)
    
    # Generate random timestamps within the last year
    now = datetime.now()
    created_at = now - timedelta(days=random.randint(1, 365))
    updated_at = created_at + timedelta(days=random.randint(1, 30))
    
    # Generate random featured tracks
    featured_tracks = []
    for i in range(random.randint(0, 3)):
        artist = random.choice([group["first_names"][0] for group in cultural_groups])
        track = f"Track {random.randint(1, 100)}"
        featured_tracks.append(f"{artist} - {track}")
    
    # Create image URLs using the requested format
    image_id = id_hash[:24]
    profile_image = f"images/producers/profile/{image_id}"
    cover_image = f"images/producers/cover/{image_id}"
    
    # Generate gallery images
    gallery_images = []
    for i in range(random.randint(0, 6)):
        gallery_images.append(f"images/producers/gallery/{image_id}/{i+1}")
    
    # Create about text with cultural flavor
    about = f"{full_name} is a passionate music producer from {country} specializing in {', '.join(producer_genres[:-1])} and {producer_genres[-1] if producer_genres else ''}. "
    about += f"With expertise in {', '.join(producer_skills[:2])}, {first_name} has been creating amazing tracks for {random.choice(experience_levels)}."
    
    # Create portfolio and social media links
    portfolio_links = {
        "website": f"https://www.{first_name.lower()}{last_name.lower()}.com",
        "soundcloud": f"https://soundcloud.com/{first_name.lower()}{last_name.lower()}",
        "spotify": f"https://open.spotify.com/artist/{id_hash[:22]}"
    }
    
    social_media = {
        "instagram": f"https://instagram.com/{first_name.lower()}{last_name.lower()}",
        "twitter": f"https://twitter.com/{first_name.lower()}{last_name.lower()}",
        "facebook": f"https://facebook.com/{first_name.lower()}{last_name.lower()}"
    }
    
    # Create the producer document
    producer = {
        "_id": producer_id,
        "userId": user_id,
        "fullName": full_name,
        "email": email,
        "password": f"$2b$10${id_hash[:22]}",  # Fake hashed password
        "phoneNumber": f"+{random.randint(1, 99)}{random.randint(1000000000, 9999999999)}",
        "country": country,
        "role": "Music Producer",
        "genres": producer_genres,
        "experience": random.choice(experience_levels),
        "portfolioLinks": portfolio_links,
        "socialMedia": social_media,
        "termsAgreed": True,
        "profileImage": profile_image,
        "coverImage": cover_image,
        "galleryImages": gallery_images,
        "about": about,
        "tags": producer_tags,
        "skills": producer_skills,
        "tools": producer_tools,
        "featuredTracks": featured_tracks,
        "links": [],
        "createdAt": created_at,
        "updatedAt": updated_at,
        "__v": random.randint(0, 30)
    }
    
    return producer

async def insert_dummy_producers():
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]
    
    try:
        # Check existing count of music producers
        existing_count = await collection.count_documents({"role": "Music Producer"})
        print(f"Found {existing_count} existing music producers in the database")
        
        # We want to reach exactly 100 producers
        num_to_add = 50  # Add exactly 50 more producers
        print(f"Adding {num_to_add} more music producers...")
        
        # Generate and insert one by one to avoid batch errors
        added_count = 0
        while added_count < num_to_add:
            producer = generate_random_producer()
            
            try:
                # Try to insert one producer at a time
                result = await collection.insert_one(producer)
                if result.inserted_id:
                    added_count += 1
                    print(f"Added producer {added_count}/{num_to_add}: {producer['fullName']}")
            except Exception as e:
                # If this producer caused an error, just skip and generate another
                print(f"Skipping duplicate or error: {str(e)[:100]}...")
        
        final_count = await collection.count_documents({"role": "Music Producer"})
        print(f"Successfully populated database. Now have {final_count} music producers")
        
    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        client.close()
        print("Connection closed")

if __name__ == "__main__":
    asyncio.run(insert_dummy_producers())