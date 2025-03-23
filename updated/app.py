from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

# Initialize Flask App

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins


# MongoDB Configuration (Updated)
app.config["MONGO_URI"] = "mongodb+srv://akkuaqeel:c5gnbetgTfGUHM0s@studyhub.tr3zm.mongodb.net/?retryWrites=true&w=majority&appName=StudyHub"
mongo = PyMongo(app)

print("✅ Flask app started successfully!")

# ------------------------------
# 🔹 AUTH API (SIGNUP & LOGIN)
# ------------------------------

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get("email")
    semester_id = data.get("semester_id")

    if not email or not semester_id:
        return jsonify({"error": "Email and semester are required"}), 400

    if mongo.db.users.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    user_id = mongo.db.users.insert_one({"email": email, "semester_id": ObjectId(semester_id)}).inserted_id
    return jsonify({"message": "User registered", "id": str(user_id)}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = mongo.db.users.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    semester_id = user.get("semester_id")
    if not semester_id:
        return jsonify({"error": "Semester not assigned to user"}), 400

    subjects = list(mongo.db.subjects.find({"semester_id": semester_id}, {"_id": 1, "subject_name": 1}))
    
    for sub in subjects:
        sub["_id"] = str(sub["_id"])

    return jsonify({"semester_id": str(semester_id), "subjects": subjects}), 200

# ------------------------------
# 🔹 SUBJECTS API
# ------------------------------

@app.route('/semesters/<semester_id>/subjects', methods=['GET'])
def get_subjects(semester_id):
    subjects = list(mongo.db.subjects.find({"semester_id": ObjectId(semester_id)}, {"_id": 1, "subject_name": 1}))
    
    for sub in subjects:
        sub["_id"] = str(sub["_id"])
        
    return jsonify(subjects), 200

# ------------------------------
# 🔹 MODULES & VIDEOS API
# ------------------------------

@app.route('/subjects/<subject_id>/modules', methods=['GET'])
def get_modules(subject_id):
    modules = list(mongo.db.modules.find({"subject_id": ObjectId(subject_id)}, {"_id": 1, "module_name": 1, "module_number": 1}))
    
    for mod in modules:
        mod["_id"] = str(mod["_id"])
        
    return jsonify(modules), 200

@app.route('/modules/<module_id>/topics', methods=['GET'])
def get_topics(module_id):
    topics = list(mongo.db.topics.find({"module_id": ObjectId(module_id)}, {"_id": 1, "topic_name": 1, "youtube_link": 1}))
    
    for topic in topics:
        topic["_id"] = str(topic["_id"])
        
    return jsonify(topics), 200

# ------------------------------
# 🔹 ERROR HANDLING
# ------------------------------

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not Found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal Server Error"}), 500

# ------------------------------
# 🔹 RUN THE APP
# ------------------------------
if __name__ == '__main__':
    print("🚀 Running Flask API on http://127.0.0.1:5000/")
    app.run(debug=True)
