from django.contrib import admin

from .models import User, Route, RouteHistory, FavouriteRoutes
admin.site.register(User)
admin.site.register(Route)
admin.site.register(RouteHistory)
admin.site.register(FavouriteRoutes)
