from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .services.route_processor import process_user_input
import json

@csrf_exempt
def generate_route_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_input = data.get('user_input', '')
            route_style = data.get('route_style', '')
            route_time = data.get('route_time', '')
            
            if not user_input:
                return JsonResponse({'error': 'No user input provided'}, status=400)
            
            result = process_user_input(user_input, route_style, route_time)
            
            routes_response = []
            for route in result:
                routes_response.append({
                    'route_index': route.get('route_index'),
                    'title': route.get('title'),
                    'description': route.get('description'),
                    'start': route.get('start'),
                    'waypoints': route.get('waypoints'),
                    'endpoint': route.get('endpoint')
                })
            
            return JsonResponse({'routes': routes_response})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)