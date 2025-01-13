import openai
import json
from dotenv import load_dotenv
import os
from django.core.cache import cache
from .verify_location import geocode_locations

load_dotenv()

# Get the API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

def load_filtered_data(file_name):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, file_name)
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()
    
filtered_data = load_filtered_data('filtered_dataset.csv')

def read_prompts(file_name):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, file_name)
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.readlines()
    
def filter_response(response_content):
    json_start = response_content.find('{')
    json_end = response_content.rfind('}') + 1
    json_str = response_content[json_start:json_end]
    
    # Parse JSON
    response = json.loads(json_str)
    
    required_keys = ['routes']
    route_keys = ['route_index', 'title', 'description', 'start', 'waypoints', 'endpoint']
    location_keys = ['name', 'address', 'latitude', 'longitude']
    
    if response == "ERROR OCCURED":
        return "ERROR OCCURRED DURING RESPONSE GENERATION INVALID REQUEST"
    
    for key in required_keys:
        if key not in response:
            return "ERROR OCCURRED DURING RESPONSE GENERATION"
    
    routes = response['routes']
    for route in routes:
        for key in route_keys:
            if key not in route:
                return "ERROR OCCURRED DURING RESPONSE GENERATION"
            if key == 'waypoints':
                for waypoint in route['waypoints']:
                    for loc_key in location_keys:
                        if loc_key not in waypoint:
                            return "ERROR OCCURRED DURING RESPONSE GENERATION"
            elif key in ['start', 'endpoint']:
                for loc_key in location_keys:
                    if loc_key not in route[key]:
                        return "ERROR OCCURRED DURING RESPONSE GENERATION"
    
    return response

def parse_response(response):
    routes = response['routes']
    parsed_routes = []

    for route in routes:
        route_index = route['route_index']
        title = route['title']
        description = route['description']
        start = route['start']
        waypoints = route['waypoints']
        end = route['endpoint']
        
        # Geocode locations with name and address
        start = geocode_locations([{'name': start['name'], 'address': start['address']}])[0]    
        waypoints = geocode_locations([{'name': waypoint['name'], 'address': waypoint['address']} for waypoint in waypoints])
        end = geocode_locations([{'name': end['name'], 'address': end['address']}])[0]
        
        print(route_index, title, description, start, waypoints, end)
        
        parsed_routes.append({
            'route_index': route_index,
            'title': title,
            'description': description,
            'start': start,
            'waypoints': waypoints,
            'endpoint': end
        })
    
    return parsed_routes
    
def initialize_context():
    prompts = read_prompts('prompts.txt')
    context = [
        {"role": "system", "content": prompts[0]},
        {"role": "system", "content": prompts[1]},
        {"role": "system", "content": ''.join(prompts[2:106])},
        {"role": "system", "content": ''.join(prompts[107:108])},
        {"role": "system", "content": filtered_data}
    ]
    return context
    
def get_route_details(user_input, route_style, route_time):
    context = cache.get('conversation_context', initialize_context())
    dataset_sent = cache.get('dataset_sent', False)
    
    if not dataset_sent:
        context.append({"role": "system", "content": filtered_data})
        cache.set('dataset_sent', True)
        print("dataset_sent set to True")
    
    user_input = user_input + f" Route style: {route_style}, Route time: {route_time}"
    context.append({"role": "user", "content": user_input})

    completion = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=context
    )

    response_content = completion.choices[0].message.content
    context.append({"role": "assistant", "content": response_content})
    cache.set('conversation_context', context)
    print("conversation_context updated")
    
    print(response_content)
    return response_content
    

if __name__ == '__main__':
    user_input1 = 'Provide me with python code do sum two numbers'
    user_input = "I want to go for a walk in Wrocław, start from Magellana 27, and end somewhere in Rynek to see historical things, but I want to stop for a coffee somewhere along the way"
    result = get_route_details(user_input)
    parse_response(result)