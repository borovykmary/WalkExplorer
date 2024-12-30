import openai
import json
from dotenv import load_dotenv
import os

load_dotenv()

# Get the API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")


def read_prompts(file_name):
    with open(file_name, 'r') as file:
        return file.readlines()
    
def filter_response(response):
    required_keys = ['title', 'description', 'start', 'waypoints', 'endpoint']
    
    if response == "ERROR OCCURED":
        return "ERROR OCURRED DURING RESPONSE GENERATION"
    
    for key in required_keys:
        if key not in response:
            return "ERROR OCURRED DURING RESPONSE GENERATION"
    
    return response

def parse_response(response_content):
    json_start = response_content.find('{')
    json_end = response_content.rfind('}') + 1
    json_str = response_content[json_start:json_end]
    
    # Parse JSON
    route_details = json.loads(json_str)
    
    # Extract coordinates
    title = route_details['title']
    description = route_details['description']
    start = route_details['start']
    waypoints = route_details['waypoints']
    end = route_details['endpoint']
    print(title, description, start, waypoints, end)
    
    return title, description, start, waypoints, end
    
def get_route_details(user_input):
    prompts = read_prompts('prompts.txt')
    completion = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": prompts[0]},
            {"role": "system", "content": prompts[1]},
            {"role": "user", "content": prompts[2]},
            {"role": "user", "content": user_input}
        ]
    )

    response_content = completion.choices[0].message.content
    print(response_content)
    return response_content
    

if __name__ == '__main__':
    user_input1 = 'Provide me with python code do sum two numbers'
    user_input = "I want to go for a walk in Wrocław, start from Magellana 27, and end somewhere in Rynek to see historical things, but I want to stop for a coffee somewhere along the way"
    result = get_route_details(user_input)
    parse_response(result)