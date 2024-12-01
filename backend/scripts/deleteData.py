from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB connection
MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    raise ValueError("MONGODB_URI not found in .env file")

client = MongoClient(MONGODB_URI)

# Database to delete
db_name = "whatdoyouknowaboutcovid19"

try:
    # Confirm before deleting the database
    confirmation = input(f"Are you sure you want to delete the '{db_name}' database? Type 'yes' to confirm: ")
    if confirmation.lower() == "yes":
        client.drop_database(db_name)
        print(f"Database '{db_name}' deleted successfully.")
    else:
        print("Operation cancelled. No changes were made.")
except Exception as e:
    print(f"Error deleting database: {e}")
finally:
    client.close()
