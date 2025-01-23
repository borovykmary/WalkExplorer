<<<<<<< HEAD
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .services.route_processor import process_user_input
import json
=======
from django.shortcuts import render
from rest_framework.decorators import api_view
>>>>>>> basic_front_new
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserProfileSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
import json
from .models import User, Route
from datetime import datetime, timedelta
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

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
    

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if User.objects.filter(email=email).exists():
            return Response({"error": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=email, email=email, password=password)
        user.save()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]  
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print(email, password)
        user = authenticate(request, username=email, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Login successful!", "token": token.key}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)

    def patch(self, request):
        data = request.data
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
        
class RouteView(APIView):
    def get(self, request):
        routes = Route.objects.all()
        routes_data = [{'route_id': route.route_id, 'user_id': route.user_id.user_id, 'title': route.title, 'description': route.description, 'start_point': route.start_point, 'waypoints': route.waypoints, 'endpoint': route.endpoint} for route in routes]
        return JsonResponse({'routes': routes_data})

    def post(self, request):
        data = request.data
        route = Route.objects.create(
            user_id=User.objects.get(user_id=data.get('user_id')),
            title=data.get('title'),
            description=data.get('description'),
            start_point=data.get('start_point'),
            waypoints=data.get('waypoints'),
            endpoint=data.get('endpoint')
        )
        route.save()
        return JsonResponse({'message': 'Route added successfully', 'route_id': route.route_id})

    def delete(self, request, route_id):
        try:
            route = Route.objects.get(route_id=route_id)
            route.delete()
            return JsonResponse({'message': 'Route deleted successfully'})
        except Route.DoesNotExist:
            return JsonResponse({'error': 'Route not found'}, status=404)
        