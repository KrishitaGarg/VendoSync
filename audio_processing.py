from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import whisper
import torch
from transformers import pipeline
import tempfile
import os
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

os.environ["PATH"] += os.pathsep + r"C:\ffmpeg\bin"

app = FastAPI()

origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = "cuda:0" if torch.cuda.is_available() else "cpu"

english_model = whisper.load_model("turbo")

hindi_model = pipeline(
    "automatic-speech-recognition",
    model="collabora/whisper-tiny-hindi",
    chunk_length_s=30,
    device=device
)

@app.post("/transcribe")
async def transcribe_audio(
    audio: UploadFile = File(...),
    language: int = Form(...)
):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
            content = await audio.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        if language == 1:
            result = english_model.transcribe(temp_file_path)
            transcription = result["text"]
        elif language == 2:
            result = hindi_model(temp_file_path, return_timestamps=True)
            transcription = result["text"]
        else:
            return JSONResponse(
                status_code=400,
                content={"error": "Invalid language code. Use 1 for English, 2 for Hindi"}
            )
        
        os.unlink(temp_file_path)
        
        return JSONResponse(
            status_code=200,
            content={"transcription": transcription}
        )
    
    except Exception as e:
        if 'temp_file_path' in locals():
            try:
                os.unlink(temp_file_path)
            except:
                pass
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

@app.get("/")
async def root():
    return {"message": "Whisper Audio Transcription API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)