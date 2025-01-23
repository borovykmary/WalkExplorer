from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)  
    email = models.EmailField(max_length=255, unique=True)
    hashed_password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.username

class Route(models.Model):
    route_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    start_point = models.CharField(max_length=255)
    waypoints = models.TextField(blank=True, null=True)  # Assuming waypoints are stored as a JSON string
    endpoint = models.CharField(max_length=255)

    def __str__(self):
        return self.title