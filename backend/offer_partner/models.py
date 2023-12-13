from django.db import models

from coreapp.base import BaseModel
from offer_partner import constants


# Create your models here.


class OfferPartner(BaseModel):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500, null=True, blank=True)
    image = models.ForeignKey('coreapp.Document', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    type = models.IntegerField(choices=constants.OfferPartnerType.choices)
    is_active = models.BooleanField(default=True)

    def get_image_url(self):
        return self.image.get_url

    def __str__(self):
        return self.title
