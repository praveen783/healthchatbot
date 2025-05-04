from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from google.generativeai import configure, GenerativeModel

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# FastAPI app
app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class ChatRequest(BaseModel):
    message: str

# Chat endpoint
@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        configure(api_key=GEMINI_API_KEY)
        model = GenerativeModel("gemini-1.5-flash")  # or any supported model
        response = model.generate_content(req.message)
        reply = response.text
    except Exception as e:
        reply = f"Error: {str(e)}"

    return {"reply": reply}
