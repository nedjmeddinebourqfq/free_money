import uuid
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _

from coreapp import constants, roles
from coreapp.manager import MyUserManager
from .base import BaseModel


# Create your models here.

class Country(BaseModel):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=10)
    phone_code = models.CharField(_("Phone code"), max_length=50)
    flag = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class User(AbstractBaseUser, PermissionsMixin):
    uid = models.UUIDField(default=uuid.uuid4, unique=True)
    username = models.CharField(unique=True, max_length=20)
    email = models.EmailField(unique=True, null=True, blank=True)
    mobile = models.CharField(max_length=15, null=True)
    dob = models.DateField(blank=True, null=True)
    image = models.ForeignKey('coreapp.Document', on_delete=models.SET_NULL, null=True, blank=True)
    wallet = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(blank=True)
    role = models.IntegerField(choices=roles.UserRoles.choices, default=roles.UserRoles.USER)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username', 'mobile')
    objects = MyUserManager()

    def __str__(self):
        return self.email

    @cached_property
    def get_image_url(self):
        return self.image.get_url if self.image_id else None


class UserConfirmation(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    confirmation_code = models.CharField(max_length=100)
    ip_address = models.CharField(max_length=100)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} - {self.confirmation_code} : {self.is_used}"


class LoginHistory(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=100)
    user_agent = models.CharField(max_length=500)
    is_success = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} - {self.ip_address} - {self.user_agent} - {self.is_success}"


class Document(BaseModel):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    document = models.FileField(upload_to='documents/%Y/%m/%d/')
    doc_type = models.SmallIntegerField(choices=constants.DocumentChoices.choices)

    def __str__(self):
        return f"{self.owner} - {self.document.name}"

    @cached_property
    def get_url(self):
        return f"{settings.MEDIA_HOST}{self.document.url}"
