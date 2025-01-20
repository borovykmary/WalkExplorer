# Generated by Django 5.1.3 on 2025-01-15 11:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('we_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='routehistory',
            name='route_id',
        ),
        migrations.RemoveField(
            model_name='routehistory',
            name='user_id',
        ),
        migrations.RenameField(
            model_name='route',
            old_name='end_point',
            new_name='endpoint',
        ),
        migrations.RenameField(
            model_name='route',
            old_name='route_name',
            new_name='title',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='email',
            new_name='email',
        ),
        migrations.RemoveField(
            model_name='route',
            name='stop_point',
        ),
        migrations.RemoveField(
            model_name='route',
            name='time',
        ),
        migrations.AddField(
            model_name='route',
            name='user_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='we_app.user'),
        ),
        migrations.AddField(
            model_name='route',
            name='waypoints',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name='FavouriteRoutes',
        ),
        migrations.DeleteModel(
            name='RouteHistory',
        ),
    ]
