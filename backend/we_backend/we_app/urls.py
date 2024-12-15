# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('generate_route/', views.generate_route_view, name='generate_route'),
]

