from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import json
import uuid
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# -----------------------------
# Load AI Model
# -----------------------------
model = tf.keras.models.load_model("models/plant_disease_recog_model_pwp.keras")

with open("plant_disease.json", "r") as file:
    plant_disease = json.load(file)

# -----------------------------
# Demo User
# -----------------------------
DEMO_USER = {
    "email": "admin@agriinsight.ai",
    "password": "Agri1234!",
    "name": "Admin"
}

DEMO_TOKEN = "demo-token-123"

# Store prediction history (temporary)
history = []

# -----------------------------
# Upload Images
# -----------------------------
@app.route('/uploadimages/<path:filename>')
def uploaded_images(filename):
    return send_from_directory("uploadimages", filename)

# -----------------------------
# Authentication
# -----------------------------
@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if (
        email == DEMO_USER["email"]
        and password == DEMO_USER["password"]
    ):
        return jsonify({
            "data": {
                "token": {
                    "access_token": DEMO_TOKEN
                },
                "user": {
                    "name": DEMO_USER["name"],
                    "email": DEMO_USER["email"]
                }
            }
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401


@app.route("/auth/me", methods=["GET"])
def auth_me():
    auth = request.headers.get("Authorization")

    if auth != f"Bearer {DEMO_TOKEN}":
        return jsonify({
            "message": "Unauthorized"
        }), 401

    return jsonify({
        "data": {
            "name": DEMO_USER["name"],
            "email": DEMO_USER["email"]
        }
    })

# -----------------------------
# AI Prediction
# -----------------------------
def extract_features(image_path):
    image = tf.keras.utils.load_img(image_path, target_size=(160, 160))
    image = tf.keras.utils.img_to_array(image)
    image = np.array([image])
    return image


def predict_image(image_path):
    img = extract_features(image_path)

    prediction = model.predict(img)

    confidence = float(np.max(prediction) * 100)

    index = int(np.argmax(prediction))

    disease = plant_disease[index]

    return disease, confidence


@app.route("/predict", methods=["POST"])
def predict():

    auth = request.headers.get("Authorization")

    if auth != f"Bearer {DEMO_TOKEN}":
        return jsonify({
            "message": "Unauthorized"
        }), 401

    if "image" not in request.files:
        return jsonify({
            "message": "No image uploaded"
        }), 400

    image = request.files["image"]

    os.makedirs("uploadimages", exist_ok=True)

    filename = f"{uuid.uuid4().hex}_{image.filename}"

    filepath = os.path.join("uploadimages", filename)

    image.save(filepath)

    disease, confidence = predict_image(filepath)

    result = {
        "id": str(uuid.uuid4()),
        "image_name": image.filename,
        "disease": disease["name"],
        "confidence": round(confidence, 2),
        "treatment": disease["cure"],
        "weather": "Keep the field dry and monitor crop regularly.",
        "report_url": "",
        "created_at": datetime.now().isoformat()
    }

    history.insert(0, result)

    return jsonify({
        "data": result
    })

# -----------------------------
# History
# -----------------------------
@app.route("/history", methods=["GET"])
def get_history():

    auth = request.headers.get("Authorization")

    if auth != f"Bearer {DEMO_TOKEN}":
        return jsonify({
            "message": "Unauthorized"
        }), 401

    return jsonify({
        "data": {
            "items": history
        }
    })


@app.route("/history/<prediction_id>", methods=["DELETE"])
def delete_history(prediction_id):

    auth = request.headers.get("Authorization")

    if auth != f"Bearer {DEMO_TOKEN}":
        return jsonify({
            "message": "Unauthorized"
        }), 401

    global history

    history = [
        item for item in history
        if item["id"] != prediction_id
    ]

    return jsonify({
        "message": "Deleted successfully"
    })

# -----------------------------
# Run Flask
# -----------------------------
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )