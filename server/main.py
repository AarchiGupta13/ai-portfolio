from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv
from resume_context import RESUME_CONTEXT

# Load environment variables
load_dotenv()

app = FastAPI()

# Allow frontend to communicate with backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load OpenRouter API key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

class ChatRequest(BaseModel):
    message: str


@app.get("/")
def read_root():
    return {"message": "Backend is running successfully 🚀"}


@app.post("/api/chat")
def chat_with_ai(data: ChatRequest):
    user_message = data.message

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "mistralai/mistral-7b-instruct",
                "messages": [
                    {
                        "role": "system",
                        "content": RESUME_CONTEXT
                    },
                    {
                        "role": "user",
                        "content": user_message
                    }
                ],
                "temperature": 0.2
            }
        )

        result = response.json()

        # Safety check in case API structure changes
        if "choices" not in result:
            return {"reply": "AI service error. Please try again."}

        reply = result["choices"][0]["message"]["content"]

        return {"reply": reply}

    except Exception as e:
        return {"reply": f"Server error: {str(e)}"}