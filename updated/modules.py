from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["StudyHub"]

@app.route("/get_modules", methods=["GET"])
def get_modules():
    subject_name = request.args.get("subject")
    
    result = db.semesters.find_one(
        {"subjects.name": subject_name},
        {"_id": 0, "subjects.modules": 1}
    )

    if result and "subjects" in result:
        return jsonify({"modules": result["subjects"][0]["modules"]})
    
    return jsonify({"error": "Subject not found"}), 404

@app.route("/get_topics", methods=["GET"])
def get_topics():
    subject_name = request.args.get("subject")
    module_number = int(request.args.get("module"))

    result = db.semesters.find_one(
        {"subjects.name": subject_name},
        {"_id": 0, "subjects.modules": 1}
    )

    if result and "subjects" in result:
        for module in result["subjects"][0]["modules"]:
            if module["moduleNumber"] == module_number:
                return jsonify({"topics": module["topics"]})

    return jsonify({"error": "Module not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
