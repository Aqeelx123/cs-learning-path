from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Use your new MongoDB URI
MONGO_URI = "mongodb+srv://akkuaqeel:c5gnbetgTfGUHM0s@studyhub.tr3zm.mongodb.net/?retryWrites=true&w=majority&appName=StudyHub"

# Validate MongoDB URI
if not MONGO_URI:
    print("❌ ERROR: MONGO_URI not found! Check your .env file.")
    exit(1)

# Connect to MongoDB
try:
    print("🚀 Connecting to MongoDB...")
    client = MongoClient(MONGO_URI)
    db = client["StudyHub"]  # Update database name to match your new DB
    print("✅ MongoDB connection established successfully!")
except Exception as e:
    print(f"❌ MongoDB Connection Failed: {e}")
    exit(1)

# Define collections (using your new database)
users_collection = db["users"]
semesters_collection = db["semesters"]
subjects_collection = db["subjects"]
modules_collection = db["modules"]
topics_collection = db["topics"]
flashcards_collection = db["flashcards"]
quizzes_collection = db["quizzes"]
