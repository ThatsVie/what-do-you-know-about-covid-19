import pandas as pd
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
db = client["whatdoyouknowaboutcovid19"]
collection = db["articles"]

# Load cleaned data
clean_data_file = "data/covid19articles_cleaned.csv"
data = pd.read_csv(clean_data_file)

# Adjust data format for MongoDB insertion
def format_record(record):
    record["authors"] = record["Author(s)"].split(", ") if isinstance(record["Author(s)"], str) else []
    record["tags"] = record["Tags"].split(", ") if isinstance(record["Tags"], str) else []
    record["year"] = int(record["Year"]) if pd.notna(record["Year"]) else None
    record["date_published"] = record["Date Published"] if pd.notna(record["Date Published"]) else None
    record["summary"] = record["Summary"] if pd.notna(record["Summary"]) else None
    record["url"] = record["URL"].strip() if pd.notna(record["URL"]) else None
    return {
        "title": record["Title"].strip(),
        "authors": record["authors"],
        "source": record["Source"].strip(),
        "date_published": record["date_published"],
        "year": record["year"],
        "category": record["Category"].strip(),
        "tags": record["tags"],
        "summary": record["summary"],
        "url": record["url"],
    }

# Convert DataFrame to list of dictionaries
data_records = data.to_dict(orient="records")
formatted_records = [format_record(record) for record in data_records]

# Insert into MongoDB
try:
    result = collection.insert_many(formatted_records)
    print(f"Inserted {len(result.inserted_ids)} records into MongoDB.")
except Exception as e:
    print(f"Error inserting records: {e}")

client.close()
