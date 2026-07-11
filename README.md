# 🌱 AgriInsight AI

> **An AI-Powered Smart Agriculture Assistant for Early Plant Disease Detection and Intelligent Farming Recommendations**

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TensorFlow-AI-FF6F00?style=for-the-badge&logo=tensorflow" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

---

# 📖 Overview

Agriculture is the backbone of many economies, yet millions of farmers struggle with identifying plant diseases at an early stage. Delayed diagnosis often results in reduced crop yield, excessive pesticide usage, and financial losses.

**AgriInsight AI** is an intelligent agriculture assistant that combines **Artificial Intelligence, Computer Vision, Explainable AI, Weather Intelligence, Retrieval-Augmented Generation (RAG), and Large Language Models** to provide farmers with accurate disease detection and actionable recommendations.

Using a simple web application, farmers can upload an image of a plant leaf and instantly receive:

- Disease prediction
- Confidence score
- Severity analysis
- Explainable AI visualization
- Treatment recommendations
- Weather-based spraying advice
- Pesticide dosage calculation
- Nearby agricultural resources
- AI-powered farming assistance
- Downloadable PDF reports

---

# 🎯 Problem Statement

Farmers frequently face challenges such as:

- Difficulty identifying plant diseases
- Limited access to agricultural experts
- Incorrect pesticide usage
- Delayed disease treatment
- Weather uncertainty before spraying
- Lack of reliable farming guidance

These issues significantly increase production costs while reducing crop productivity.

---

# 💡 Solution

AgriInsight AI enables farmers to make informed decisions through AI-powered diagnostics and intelligent recommendations.

The application:

- Detects plant diseases using deep learning
- Estimates disease severity
- Explains prediction using Grad-CAM
- Suggests organic and chemical treatments
- Calculates pesticide dosage
- Verifies weather conditions before spraying
- Locates nearby agricultural stores
- Generates comprehensive PDF reports
- Provides multilingual AI chatbot support

---

# ✨ Features

## 🌿 AI Disease Detection

- Upload plant leaf images
- Deep Learning-based disease prediction
- Confidence score estimation

---

## 📊 Severity Analysis

Automatically classifies infections as:

- Mild
- Moderate
- Severe

---

## 🔍 Explainable AI (Grad-CAM)

Highlights infected regions on the leaf image, making AI predictions transparent and trustworthy.

---

## 💊 Smart Treatment Recommendation

Provides:

- Organic treatments
- Chemical treatments
- Recommended pesticides
- Safety precautions
- Prevention tips

---

## 🌦 Weather Intelligence

Checks:

- Rain forecast
- Temperature
- Humidity
- Wind speed

Recommends whether pesticide spraying is safe.

---

## 🧪 Pesticide Calculator

Calculates:

- Required pesticide quantity
- Water quantity
- Number of tank refills

Based on farm area.

---

## 📍 Nearby Agricultural Resources

Locate nearby:

- Fertilizer Shops
- Seed Shops
- Krishi Kendras

using Google Maps.

---

## 🤖 AI Agriculture Assistant

Supports multiple languages:

- English
- Hindi
- Marathi

Provides accurate farming guidance using trusted agricultural knowledge.

---

## 📑 PDF Report Generator

Generate professional reports including:

- Disease Name
- Confidence Score
- Severity
- Symptoms
- Causes
- Treatment
- Weather Recommendation
- Pesticide Calculation

---

## 📈 Scan History

Maintains previous scan reports for future reference.

---

# 🧠 AI Agent Architecture

| AI Agent | Responsibility |
|-----------|---------------|
| Vision Agent | Detects plant disease |
| Severity Agent | Determines infection severity |
| Diagnosis Agent | Generates diagnosis |
| Knowledge Agent | Retrieves agricultural knowledge |
| Explanation Agent | Generates disease explanation |
| Treatment Agent | Suggests treatments |
| Weather Agent | Checks weather conditions |
| Resource Agent | Finds nearby agricultural resources |
| Report Agent | Generates PDF reports |
| Chatbot Agent | Answers farming questions |

---

# 🔄 Workflow

```
Farmer Uploads Leaf Image
            │
            ▼
 Disease Detection Model
            │
            ▼
 Severity Analysis
            │
            ▼
 Explainable AI (Grad-CAM)
            │
            ▼
 Knowledge Retrieval (RAG)
            │
            ▼
 Treatment Recommendation
      ┌─────┼─────────────┐
      ▼     ▼             ▼
 Weather  Calculator  Nearby Stores
            │
            ▼
     PDF Report Generation
            │
            ▼
 Dashboard & Scan History
```

---

# 🏗 System Architecture

```
               React Frontend
                      │
                      ▼
              FastAPI Backend
                      │
      ┌───────────────┼───────────────┐
      ▼               ▼               ▼
 AI Model      Weather API     Maps API
      │
      ▼
 TensorFlow Model
      │
      ▼
 Disease Prediction
      │
      ▼
 SQLite Database
      │
      ▼
 PDF Report Generation
```

---

# 🛠 Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic

## AI / Machine Learning

- TensorFlow
- EfficientNetB0
- OpenCV
- NumPy
- Grad-CAM

## Generative AI

- OpenAI GPT
- Llama
- RAG
- FAISS

## Database

- SQLite
- PostgreSQL (Future)

## APIs

- OpenWeather API
- Google Maps API

## Reports

- ReportLab

---

# 📂 Project Structure

```
AgriInsight-AI
│
├── frontend/
├── backend/
├── ai_model/
├── agents/
├── services/
├── database/
├── reports/
├── assets/
├── docs/
├── README.md
├── requirements.txt
├── package.json
└── .gitignore
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/<username>/AgriInsight-AI.git

cd AgriInsight-AI
```

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📷 Screenshots

> Add screenshots here before final submission.

- Landing Page
- Dashboard
- Disease Detection
- Treatment Recommendation
- Weather Recommendation
- AI Chatbot
- PDF Report

---

# 🚀 Future Scope

- Drone-based Crop Monitoring
- IoT Sensor Integration
- Offline Mobile Application
- Predictive Disease Forecasting
- Satellite Crop Analysis
- Farmer Community Platform
- Multi-language Voice Assistant

---

# 👥 Team

**Team Name:** *Your Team Name*

| Name | Role |
|------|------|
| Member 1 | AI / Machine Learning |
| Member 2 | Backend Development |
| Member 3 | Frontend Development |
| Member 4 | Documentation & Presentation |

---

# 🏆 Hack4Humanity 2026

Developed for **Hack4Humanity 2026** with the vision of empowering farmers through Artificial Intelligence, Explainable AI, and Intelligent Decision Support Systems.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⭐ Show Your Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

Together, let's build a smarter and more sustainable future for agriculture. 🌱
