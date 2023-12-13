from django.db.models import IntegerChoices
from django.utils.translation import gettext_lazy as _


class PaymentMethodType(IntegerChoices):
    WITHDRAW_CASH = 0, _('Withdraw Cash')
    WITHDRAW_CARD = 1, _('Withdraw Card')
    WITHDRAW_GIFT_CARD = 2, _('Withdraw Gift Card')
