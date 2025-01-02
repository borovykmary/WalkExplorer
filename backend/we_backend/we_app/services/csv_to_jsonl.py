import csv
import json
import pandas as pd

csv_file_path = 'dataset.csv'
df = pd.read_csv(csv_file_path)

columns_to_keep = ['name', 'full_address','latitude','longitude']
filtered_df = df[columns_to_keep]
filtered_csv_file_path = 'filtered_dataset.csv'
filtered_df.to_csv(filtered_csv_file_path, index=False, encoding='utf-8')

print(f"Filtered dataset saved to {filtered_csv_file_path}")
csv_file_path = 'filtered_dataset.csv'
jsonl_file_path = 'dataset.jsonl'
with open(filtered_csv_file_path, 'r', encoding='utf-8') as csv_file, open(jsonl_file_path, 'w', encoding='utf-8') as jsonl_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        jsonl_file.write(json.dumps({"prompt": "", "completion": json.dumps(row, ensure_ascii=False)}) + '\n')

print(f"JSONL dataset saved to {jsonl_file_path}")