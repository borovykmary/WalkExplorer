# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('generate-route/', views.generate_route_view, name='generate_route'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('routes/', views.RouteView.as_view(), name='routes'),
    path('routes/<int:route_id>/', views.RouteView.as_view(), name='route_detail'),
]


