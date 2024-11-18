from .llm_service import extract_route_details
from .mapbox_service import geocode_location, generate_route

def process_user_input(user_input):
    """
    Process user input to generate a walking route.
    """
    details = extract_route_details(user_input)
    start = geocode_location(details['start'])
    waypoints = [geocode_location(loc) for loc in details['waypoints']]
    end = geocode_location(details['end'])

    if start and end:
        return generate_route(start, waypoints, end)
    return None
