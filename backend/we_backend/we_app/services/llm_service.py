import openai
import json
from dotenv import load_dotenv
import os

load_dotenv()

# Get the API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")


def get_route_details(user_input):
    completion = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Provide a JSON response for a walk route in Wroclaw, ensuring all locations (start, waypoints, and endpoint) are real and verifiable as of December 2024. Use only well-known, existing places. JSON values use name and address only start for start location, waypoints for waypoints and endpoint for the end. Use only english alphabet"},
            {"role": "user", "content": user_input}
        ]
    )

    response_content = completion.choices[0].message.content
    
     # Extract JSON part from the response content
    json_start = response_content.find('{')
    json_end = response_content.rfind('}') + 1
    json_str = response_content[json_start:json_end]
    
    # Parse JSON
    route_details = json.loads(json_str)
    
    print(route_details)
    # Extract coordinates
    start = route_details['start']
    waypoints = route_details['waypoints']
    end = route_details['endpoint']
    print(start, waypoints, end)
    
    return start, waypoints, end

if __name__ == '__main__':
    user_input = "I want to go for a walk in Wrocław, start from Magellana 27, and end somewhere in Rynek to see historical things, but I want to stop for a coffee somewhere along the way"
    result = get_route_details(user_input)
    print("Route Details:", json.dumps(result, indent=2))