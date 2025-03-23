from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import json
from bson import json_util

app = Flask(__name__)
# Enable CORS with more explicit settings
CORS(app, resources={r"/api/*": {"origins": "*"}})

# MongoDB Atlas connection
try:
    # Connection string for MongoDB Atlas
    MONGO_URI = "mongodb+srv://akkuaqeel:c5gnbetgTfGUHM0s@studyhub.tr3zm.mongodb.net/?retryWrites=true&w=majority&appName=StudyHub"
    MONGO_DB = "StudyHub"
    MONGO_COLLECTION = "semesters"  # Change this if your collection name is different
    
    # Connect to MongoDB Atlas
    client = MongoClient(MONGO_URI)
    db = client[MONGO_DB]
    collection = db[MONGO_COLLECTION]
    
    # Test connection
    client.server_info()
    print(f"✅ Connected to MongoDB Atlas")
    print(f"✅ Using database: {MONGO_DB}, collection: {MONGO_COLLECTION}")
    
    # List all collections
    collections = db.list_collection_names()
    print(f"Collections in the database: {collections}")
    
    # Make sure our collection exists
    if MONGO_COLLECTION not in collections:
        print(f"⚠️ Collection '{MONGO_COLLECTION}' not found! Available collections: {collections}")
        if collections:
            # Default to the first available collection if the specified one doesn't exist
            MONGO_COLLECTION = collections[0]
            collection = db[MONGO_COLLECTION]
            print(f"Using '{MONGO_COLLECTION}' instead")
    
except Exception as e:
    print(f"❌ MongoDB connection error: {e}")
    print("The application will continue, but database functionality won't work.")

@app.route('/api/subjects', methods=['GET'])
def get_subjects():
    try:
        semester = request.args.get("semester", "1")
        print(f"Fetching subjects for semester: {semester}")
        
        # Find the document for the requested semester
        semester_data = collection.find_one({"semester": int(semester)})
        
        if not semester_data:
            print(f"No data found for semester {semester}")
            # If no data found, return empty array
            return jsonify([])
        
        # Extract subjects from the semester document
        subjects = semester_data.get("subjects", [])
        print(f"Found {len(subjects)} subjects for semester {semester}")
        
        # Convert MongoDB ObjectIDs to strings for JSON serialization
        json_subjects = json.loads(json_util.dumps(subjects))
        
        return jsonify(json_subjects)
    except Exception as e:
        print(f"Error fetching data: {e}")
        return jsonify({"error": str(e)}), 500

# Add a test route to check if the API is running
@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({
        "status": "API is running",
        "database_connected": True,
        "collections": db.list_collection_names() if 'db' in globals() else []
    })

# Add a route to list all collections and document counts
@app.route('/api/db-info', methods=['GET'])
def db_info():
    try:
        if 'db' not in globals():
            return jsonify({"error": "Database not connected"}), 500
            
        result = {
            "database": MONGO_DB,
            "collections": {}
        }
        
        # Get all collections and document counts
        for collection_name in db.list_collection_names():
            count = db[collection_name].count_documents({})
            result["collections"][collection_name] = count
            
            # If it's the semesters collection, get a sample document
            if collection_name == MONGO_COLLECTION:
                sample = db[collection_name].find_one()
                if sample:
                    # Get keys in the document
                    result["sample_keys"] = list(sample.keys())
                    
                    # Check if it has the expected structure
                    if "semester" in sample:
                        result["semester_field_exists"] = True
                        result["semester_value"] = sample["semester"]
                    
                    if "subjects" in sample:
                        result["subjects_field_exists"] = True
                        if isinstance(sample["subjects"], list):
                            result["subjects_count"] = len(sample["subjects"])
                        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Make sure to bind to 0.0.0.0 to accept connections from any IP
    app.run(debug=True, host='0.0.0.0', port=5000)