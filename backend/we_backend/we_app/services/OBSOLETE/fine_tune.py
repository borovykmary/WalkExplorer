import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

job = openai.fine_tuning.jobs.create(
    training_file="dataset_prepared.jsonl",
    model="gpt-4o-mini-2024-07-18",
)