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
from django.http import JsonResponse
from rest_framework.permissions import AllowAny

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
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)