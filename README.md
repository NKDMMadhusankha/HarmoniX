# HarmoniX 🎵

**HarmoniX** is an intelligent, AI-powered music collaboration platform developed as a Final Year Project by Mithila Madhusankha. It connects clients with music professionals such as producers, engineers, and vocalists through an intuitive interface and smart recommendations powered by a Large Language Model (LLM).

## 🚀 Features

- 🎛️ Discover and collaborate with music producers, mixing/mastering engineers, vocalists, and studios
- 🤖 AI-powered matching using **Large Language Models (LLMs)** and NLP
- 🏢 Book recording studios with customized filters
- 📂 Upload and preview past work
- 📬 Email notifications for project updates
- 🔐 Secure client and musician login

## 🧠 AI & LLM Integration

HarmoniX leverages a **Large Language Model (LLM)** to interpret free-text project descriptions from clients and recommend the most suitable music professionals. The system processes the mood, genre, and creative intent of the input using natural language understanding.

**Example prompt:**
> *"I'm looking for a romantic Sinhala acoustic ballad with clean vocals and minimal instrumentation."*

The LLM helps extract meaning from the request and suggests relevant producers, singers, or studios based on their portfolios.

### LLM Usage Highlights

- Prompt interpretation for project intent
- Musician matching based on descriptive text
- Enhanced user experience through conversational project input

> 🔄 The recommendation logic and LLM communication are handled via a Python microservice located in the `Service_ml/` folder.

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- Material UI  
- Axios  
- React Router

**Backend**  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- AWS S3 for media storage

**AI/LLM Integration**  
- Python-based LLM handler (`Service_ml/`)  
- NLP pre-processing for client input  
- Matching logic integrated into backend services

## 📁 Project Structure

```bash
HarmoniX/
├── Client/         # React Frontend
├── Server/         # Express Backend
├── Service_ml/     # Python-based LLM microservice for recommendations
└── .gitignore
