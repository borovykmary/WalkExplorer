import requests
from dotenv import load_dotenv
import os

load_dotenv()

MAPBOX_TOKEN = os.getenv("MAPBOX_TOKEN")

def geocode_location(location_name):
    url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{location_name}.json"
    params = {"access_token": MAPBOX_TOKEN}
    response = requests.get(url, params=params)
    data = response.json()
    if data['features']:
        return data['features'][0]['center']  # [longitude, latitude]
    return None

def generate_route(start, waypoints, end):
    coordinates = f"{start[0]},{start[1]};"
    coordinates += ";".join([f"{w[0]},{w[1]}" for w in waypoints])
    coordinates += f";{end[0]},{end[1]}"

    url = f"https://api.mapbox.com/directions/v5/mapbox/walking/{coordinates}"
    params = {"geometries": "geojson", "access_token": MAPBOX_TOKEN}
    response = requests.get(url, params=params)
    return response.json()
