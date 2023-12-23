from django.db import models
from django.conf import settings
from coreapp.base import BaseModel


class Balance(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)  # Representing the points instead of amount

    def __str__(self):
        return self.user.username
