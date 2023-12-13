from django.db import models

from coreapp.base import BaseModel
from payment_method import constants


class PaymentMethod(BaseModel):
    name = models.CharField(max_length=100)
    image = models.ForeignKey('coreapp.Document', on_delete=models.CASCADE)
    type = models.IntegerField(choices=constants.PaymentMethodType.choices)
    is_active = models.BooleanField(default=True)

    def get_image_url(self):
        return self.image.get_url

    def __str__(self):
        return self.name
