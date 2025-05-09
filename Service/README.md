# HarmoniX Service
This repository contains the backend service of the HarmoniX music producer recommendation system.

## How to Run
To run this service, follow these steps:

### 1. Get a Gemini API Key
Visit ``https://aistudio.google.com/apikey``.

If you're logged into Google in your browser, you'll be logged in automatically. Otherwise, sign in using your Google account.

Accept the Gemini API Services Terms and Conditions.

In the top-right corner, click the Create API Key button.

Copy and save the API key somewhere secure—you'll only see it once.

### 2. Set Up Environment Variables
In the project root, locate the .env file.

Replace the placeholder value of:

``GEMINI_API_KEY=sample_gemini_api_key``

with your actual Gemini API key.

Important: If you're uploading this project to a public repository, make sure to add the .env file to .gitignore to keep your API key secure.

### 3. Set Up a Python Virtual Environment (Recommended Python 3.12)
Create a virtual environment and activate it using one of the following methods based on your operating system:

Windows
``python -m venv venv``
``venv\Scripts\activate``

macOS/Linux
``python3 -m venv venv``
``source venv/bin/activate``

Alternatively, you can use a global Python environment, but a virtual environment is recommended.

### 4. Install Dependencies
Run the following command to install all required libraries:

``pip install -r requirements.txt``

Wait until all packages are installed.

### 5. Run the Backend Server
Use the following command to start the server:

``uvicorn app.main:app``

The server should now be running at http://127.0.0.1:8000.

To stop it:

Press Ctrl + C on Windows/Linux

Press Command + C on macOS