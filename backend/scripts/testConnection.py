from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Test MongoDB connection
try:
    client = MongoClient(os.getenv("MONGODB_URI"))
    print("Connected to MongoDB!")
    client.close()
except Exception as e:
    print(f"Error: {e}")