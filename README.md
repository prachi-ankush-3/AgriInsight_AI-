# 🌾 AgriInsight AI
### AI-Powered Smart Crop Disease Detection & Agricultural Recommendation System

<p align="center">

![Python](https://img.shields.io/badge/Python-3.10-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge&logo=flask)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![TensorFlow](https://img.shields.io/badge/TensorFlow-AI-FF6F00?style=for-the-badge&logo=tensorflow)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

---

# 📖 About the Project

**AgriInsight AI** is an AI-powered web application that helps farmers identify plant diseases by simply uploading an image of a crop leaf.

The system uses a **Deep Learning (TensorFlow/Keras)** model trained on plant disease datasets to predict the disease and provides:

- 🌿 Disease Name
- 🎯 Prediction Confidence
- 💊 Treatment Suggestions
- 🌦️ Weather-based Recommendations
- 🚜 Farming Guidance

The project combines **Artificial Intelligence**, **Computer Vision**, and **Modern Web Technologies** to make crop disease diagnosis fast, simple, and accessible.

---

# ✨ Features

✅ Upload Crop Leaf Images

✅ AI-Based Disease Detection

✅ Deep Learning Prediction Model

✅ Confidence Score

✅ Disease Description

✅ Treatment Recommendations

✅ Weather Suggestions

✅ Responsive React Frontend

✅ Flask REST API Backend

---

# 🖥️ Tech Stack

## Frontend

- React.js
- Vite
- HTML5
- CSS3
- JavaScript
- Axios

---

## Backend

- Flask
- Flask-CORS
- TensorFlow / Keras
- NumPy
- Pillow (PIL)

---

## AI Model

- TensorFlow
- Keras
- CNN (Convolutional Neural Network)

---

# 📂 Project Structure

```
AgriInsight_AI/
│
├── backend/
│   ├── app.py
│   ├── models/
│   ├── uploads/
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/AgriInsight_AI.git

cd AgriInsight_AI
```

---

## 2️⃣ Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs at:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📸 Application Screenshots

## 🏠 Home Page

> *(Add Screenshot Here)*

```
📷 home.png
```

---

## 📤 Image Upload

> *(Add Screenshot Here)*

```
📷 upload.png
```

---

## 🤖 Disease Prediction

> *(Add Screenshot Here)*

```
📷 prediction.png
```

---

## 💊 Treatment Recommendation

> *(Add Screenshot Here)*

```
📷 treatment.png
```

---

## 📱 Responsive Design

> *(Add Screenshot Here)*

```
📷 mobile.png
```

---

# 🔍 Working Flow

```
User Uploads Leaf Image
            │
            ▼
React Frontend
            │
            ▼
Flask Backend API
            │
            ▼
TensorFlow AI Model
            │
            ▼
Disease Prediction
            │
            ▼
Confidence Score
            │
            ▼
Treatment Recommendation
            │
            ▼
Display Result
```

---

# 🌱 Supported Plant Diseases

Example diseases supported by the model:

- Apple Scab
- Apple Black Rot
- Corn Rust
- Corn Leaf Blight
- Potato Early Blight
- Potato Late Blight
- Tomato Early Blight
- Tomato Late Blight
- Tomato Mosaic Virus
- Tomato Yellow Leaf Curl Virus
- Pepper Bell Bacterial Spot
- Healthy Leaves

*(Depends on the trained model.)*

---

# 📊 Model Information

| Model | CNN (TensorFlow/Keras) |
|---------|------------------------|
| Framework | TensorFlow |
| Language | Python |
| Input | Leaf Image |
| Output | Disease Prediction |
| Task | Image Classification |

---

# 📁 Dataset

Dataset used for training the model:

🔗 TensorFlow Plant Disease Dataset

https://www.tensorflow.org/datasets/catalog/plant_village

You can also train the model using the PlantVillage dataset available on Kaggle.

---

# 📓 Model Training Notebook

Google Colab Notebook:

https://colab.research.google.com/

*(Replace this with your own Colab notebook link.)*

---

# 📦 API Endpoint

### Predict Disease

```
POST /predict
```

Upload:

```
multipart/form-data
```

Parameter:

```
file : Image
```

Response:

```json
{
  "prediction": "Tomato Early Blight",
  "confidence": 98.45,
  "treatment": "Use recommended fungicide and remove infected leaves."
}
```

---

# 🔮 Future Enhancements

- 🌍 Live Weather API
- 📍 Location-Based Recommendations
- 🌾 Fertilizer Recommendation
- 🌱 Soil Analysis
- 📱 Android Application
- 🔊 Voice Assistant (Regional Languages)
- 🌐 Multi-Language Support
- 📊 Farmer Dashboard

---

# 👨‍💻 Team Members

| Name | Role |
|------|------|
| Member 1 | Frontend Development |
| Member 2 | Backend Development |
| Member 3 | AI Model Development |
| Member 4 | Testing & Documentation |

---

# 📜 Requirements

Backend dependencies:

```
Flask
Flask-CORS
tensorflow
numpy
pillow
```

Frontend dependencies:

```
React
Vite
Axios
```

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Create a Pull Request

---

# ⭐ Support

If you found this project helpful,

⭐ Star this repository

🍴 Fork it

📢 Share it with others

---

# 📄 License

This project is licensed under the MIT License.

---

## ❤️ Made with AI for Smarter Agriculture
