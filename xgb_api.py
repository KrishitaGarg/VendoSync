from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np
import xgboost as xgb
from typing import Dict, Any

app = FastAPI()

with open('xgb_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)

class PredictionRequest(BaseModel):
    data: Dict[str, Any]

class PredictionResponse(BaseModel):
    prediction: int
    probability: float

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        input_data = pd.DataFrame([request.data])
        
        for col, encoder in label_encoders.items():
            if col in input_data.columns:
                input_data[col] = encoder.transform(input_data[col].astype(str))
        
        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0].max()
        
        return PredictionResponse(
            prediction=int(prediction),
            probability=float(probability)
        )
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
