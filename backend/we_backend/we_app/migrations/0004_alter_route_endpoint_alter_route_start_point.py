# Generated by Django 5.1.2 on 2025-01-20 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('we_app', '0003_remove_route_user_id_route_user_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='endpoint',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='route',
            name='start_point',
            field=models.TextField(blank=True, null=True),
        ),
    ]
