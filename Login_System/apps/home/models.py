# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from django.contrib.auth.models import User

class Person(models.Model):
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)

# Create your models here.

