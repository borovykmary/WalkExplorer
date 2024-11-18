from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    user_email = models.EmailField(max_length=255, unique=True)
    hashed_password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class Route(models.Model):
    route_id = models.AutoField(primary_key=True)
    route_name = models.CharField(max_length=100)
    description = models.TextField()
    start_point = models.CharField(max_length=255)  # Use CharField to represent 'POINT'
    end_point = models.CharField(max_length=255)    # Use CharField to represent 'POINT'
    time = models.TimeField()
    stop_point = models.CharField(max_length=255)  # Use CharField to represent 'POINT'

    def __str__(self):
        return self.route_name


class RouteHistory(models.Model):
    history_id = models.AutoField(primary_key=True)
    route_id = models.ForeignKey(Route, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    comment = models.TextField()

    def __str__(self):
        return f"History {self.history_id} for User {self.user_id}"


class FavouriteRoutes(models.Model):
    fav_id = models.AutoField(primary_key=True)
    route_id = models.ForeignKey(Route, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Favorite Route {self.route_id} for User {self.user_id}"

