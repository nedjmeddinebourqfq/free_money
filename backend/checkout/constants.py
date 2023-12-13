from django.db.models import IntegerChoices
from django.utils.translation import gettext_lazy as _


class CashOutStatus(IntegerChoices):
    PENDING = 0, _('Pending')
    APPROVED = 1, _('Approved')
    REJECT = 2, _('Reject')
