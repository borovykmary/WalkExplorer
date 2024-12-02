from llm_service import get_route_details
from mapbox_service import geocode_location, generate_route

def process_user_input(user_input):
    """
    Process user input to generate a walking route.
    """
    start, waypoints, end = get_route_details(user_input)
    start_coords = geocode_location(start['address'])
    waypoints_coords = [geocode_location(loc['address']) for loc in waypoints]
    end_coords = geocode_location(end['address'])

    if start_coords and end_coords:
        return generate_route(start_coords, waypoints_coords, end_coords)
    return None

if __name__ == '__main__':
    user_input = input("Enter your route details: ")
    result = process_user_input(user_input)
    print("Generated Route:", result)