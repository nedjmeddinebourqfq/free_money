from datetime import datetime

from django.contrib.auth.models import BaseUserManager

from django.contrib.auth.models import BaseUserManager
from datetime import datetime


class MyUserManager(BaseUserManager):
    def _create_user(self, mobile, email, username, password=None, **extra_fields):
        if not mobile and not email:
            raise ValueError('Either mobile or email must be set')
        email = self.normalize_email(email) if email else None
        user = self.model(email=email, mobile=mobile, username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, mobile, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_verified', True)
        extra_fields.setdefault('is_approved', True)

        return self._create_user(mobile, email, username, password, **extra_fields)
