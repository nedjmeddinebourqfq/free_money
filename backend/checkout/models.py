from django.conf import settings
from django.db import models
from checkout import constants
from coreapp.base import BaseModel
from payment_method.models import PaymentMethod


class CashOutRequest(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.IntegerField()
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
    payment_address = models.CharField(max_length=200)
    status = models.IntegerField(choices=constants.CashOutStatus.choices, default=constants.CashOutStatus.PENDING)

    def __str__(self):
        return f'{self.user.username} -- {self.amount} -- {self.status}'