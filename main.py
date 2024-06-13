import torch
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

app = FastAPI()

# Set random seed for reproducibility
torch.manual_seed(0)

# Load model and tokenizer
model_name = "microsoft/Phi-3-mini-4k-instruct"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="cuda" if torch.cuda.is_available() else "cpu",
    torch_dtype="auto",
    trust_remote_code=True,
)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Create the pipeline
pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
)

# Define the request model
class PredictionRequest(BaseModel):
    prompt: str
    max_length: int = 600
    temperature: float = 0.3
    do_sample: bool = False

@app.post("/generate")
async def generate_text(request: PredictionRequest):
    try:
        print("Received request:", request)
        messages = [
            {"role": "system", "content": "You are a python developer."},
            {"role": "user", "content": request.prompt},
        ]
        generation_args = {
            "max_new_tokens": request.max_length,
            "return_full_text": False,
            "temperature": request.temperature,
            "do_sample": request.do_sample,
        }
        print("Generation arguments:", generation_args)
        output = pipe(messages, **generation_args)
        print("Output:", output)
        return {"generated_text": output[0]['generated_text']}
    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
async def read_root():
    return {"message": "Welcome to the Phi-3-mini-4k-instruct API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
