from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .services.llm_service import get_route_details
from .services.mapbox_service import geocode_location, generate_route

@csrf_exempt
def generate_route_view(request):
    if request.method == 'POST':
        user_input = request.body.decode('utf-8')
        start, waypoints, end = get_route_details(user_input)
        
        start_coords = geocode_location(start['address'])
        waypoints_coords = [geocode_location(loc['address']) for loc in waypoints]
        end_coords = geocode_location(end['address'])
        print(start_coords)
        print(waypoints_coords)
        print(end_coords)
        if start_coords and end_coords:
            route = generate_route(start_coords, waypoints_coords, end_coords)
            return JsonResponse(route)
        else:
            return JsonResponse({'error': 'Invalid route details'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)