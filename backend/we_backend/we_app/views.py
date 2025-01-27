from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .services.route_processor import process_user_input
import json
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserProfileSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from .models import User, Route

@csrf_exempt
def generate_route_view(request):
    permission_classes = [AllowAny]
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
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            if not email or not password:
                return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=email).exists():
                return Response({"error": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.create_user(username=email, email=email, password=password)
            user.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    permission_classes = [AllowAny]  
    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            if not email or not password:
                return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
            user = authenticate(request, username=email, password=password)
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"message": "Login successful!", "token": token.key}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            serializer = UserProfileSerializer(user)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request):
        try:
            data = request.data
            user = request.user
            serializer = UserProfileSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class RouteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            routes = Route.objects.filter(user_email=user.email)
            routes_data = [{'route_id': route.route_id, 'user_email': route.user_email, 'title': route.title, 'description': route.description, 'path': route.path, 'mainWaypoints': route.mainWaypoints} for route in routes]
            return JsonResponse({'routes': routes_data})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    def post(self, request):
        try:
            user = request.user
            data = request.data
            if not data.get('title') or not data.get('description'):
                return JsonResponse({'error': 'Title and description are required.'}, status=400)
            route = Route.objects.create(
                user_email=user.email,
                title=data.get('title'),
                description=data.get('description'),
                path=data.get('path'),
                mainWaypoints=data.get('mainWaypoints'),
            )
            route.save()
            return JsonResponse({'message': 'Route added successfully', 'route_id': route.route_id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    def delete(self, request, route_id):
        try:
            user = request.user
            route = Route.objects.get(route_id=route_id, user_email=user.email)
            route.delete()
            return JsonResponse({'message': 'Route deleted successfully'})
        except Route.DoesNotExist:
            return JsonResponse({'error': 'Route not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)