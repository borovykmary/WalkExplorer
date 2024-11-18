from django.http import JsonResponse
from .services.route_processor import process_user_input

def generate_route_view(request):
    """
    View to handle route generation requests.
    """
    if request.method == "POST":
        user_input = request.POST.get('input', '')
        if not user_input:
            return JsonResponse({"error": "No input provided"}, status=400)

        route_data = process_user_input(user_input)
        if route_data:
            return JsonResponse(route_data)
        return JsonResponse({"error": "Failed to generate route"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
