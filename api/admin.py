from django.contrib import admin
from api import models as api_models
from django.db.models.base import ModelBase

# Register your models here.
for name, var in api_models.__dict__.items():
    if type(var) is ModelBase:
        admin.site.register(var)