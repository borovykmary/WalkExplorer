import googlemaps
from dotenv import load_dotenv
import os

load_dotenv()

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
gmaps = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)

def geocode_location(location_name):
    query = f"{location_name}, Wrocław, Poland"
    geocode_result = gmaps.geocode(query, region="pl", bounds={"northeast": {"lat": 51.154, "lng": 17.183}, "southwest": {"lat": 51.024, "lng": 16.833}})
    print(f"Geocoding response for '{query}': {geocode_result}")
    
    filtered_results = [result for result in geocode_result if 'Wrocław' in result['formatted_address']]
    
    if filtered_results:
        return filtered_results[0]['geometry']['location']
    
    return None

def geocode_locations(locations):
    unique_locations = {}
    for location in locations:
        location_key = location['name']
        if location_key not in unique_locations:
            coordinates = geocode_location(location['name'])
            if coordinates:
                unique_locations[location_key] = coordinates
        else:
            coordinates = unique_locations[location_key]
        
        if coordinates:
            location['latitude'], location['longitude'] = coordinates['lat'], coordinates['lng']
    return locations