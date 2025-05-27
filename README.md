# HarmoniX 🎵

**HarmoniX** is an intelligent, AI-powered music collaboration platform developed as a Final Year Project by Mithila Madhusankha. It connects clients with music professionals such as producers, engineers, and vocalists through an intuitive interface and smart recommendations powered by a Large Language Model (LLM).

---

## 🚀 Features

- 🎛️ Discover and collaborate with music producers, mixing/mastering engineers, vocalists, and studios
- 🤖 AI-powered matching using **Large Language Models (LLMs)** and NLP
- 🏢 Book recording studios with customized filters
- 📂 Upload and preview past work (audio, images)
- 📬 Email notifications for project updates
- 🔐 Secure client and musician login
- 📝 Portfolio and social media integration for musicians

---

## 🧠 AI & LLM Integration

HarmoniX leverages a **Large Language Model (LLM)** to interpret free-text project descriptions from clients and recommend the most suitable music professionals. The system processes the mood, genre, and creative intent of the input using natural language understanding.

**Example prompt:**
> *"I'm looking for a romantic Sinhala acoustic ballad with clean vocals and minimal instrumentation."*

The LLM helps extract meaning from the request and suggests relevant producers, singers, or studios based on their portfolios.

> 🔄 The recommendation logic and LLM communication are handled via a Python microservice located in the [`Service_ml/`](Service_ml/README.md) folder.

---

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
- Python-based LLM handler ([`Service_ml/`](Service_ml/README.md))  
- NLP pre-processing for client input  
- Matching logic integrated into backend services

---

## 📁 Project Structure

```bash
HarmoniX/
├── Client/         # React Frontend
├── Server/         # Express Backend
├── Service_ml/     # Python-based LLM microservice for recommendations
└── .gitignore
```

---

## ⚡ Quick Start

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/HarmoniX.git
cd HarmoniX
```

### 2. Start the AI Microservice

See [`Service_ml/README.md`](Service_ml/README.md) for full setup instructions.

- Set up a Python 3.12+ virtual environment
- Install dependencies:  
  `pip install -r requirements.txt`
- Add your Gemini API key to `.env`
- Run the server:  
  `uvicorn app.main:app`

### 3. Start the Backend

```sh
cd Server
npm install
npm start
```

### 4. Start the Frontend

```sh
cd ../Client
npm install
npm run dev
```

- The frontend will be available at `http://localhost:5173`
- The backend runs at `http://localhost:5000`
- The AI microservice runs at `http://localhost:8000`

---

## 📚 Documentation

- **Frontend:** See [`Client/README.md`](Client/README.md)
- **Backend:** See [`Server/`](Server/)
- **AI Microservice:** See [`Service_ml/README.md`](Service_ml/README.md)


---

## 📝 Reviewer Notes

- The project demonstrates full-stack integration of AI-powered recommendations in a real-world music collaboration context.
- All code is organized for clarity and modularity.
- Test accounts and sample data can be provided upon request.

---

## 📧 Contact

For questions or demo access, contact:  
**Mithila Madhusankha**  
Email: mithilamadhusankha@gmail.com

---

## 📄 License

This project is for academic and demonstration purposes only.
