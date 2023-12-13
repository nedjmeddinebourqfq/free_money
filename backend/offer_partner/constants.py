from django.db.models import IntegerChoices
from django.utils.translation import gettext_lazy as _


class OfferPartnerType(IntegerChoices):
    NEW_OFFERS = 0, _('New Offer')
    OFFER_PARTNER = 1, _('Offer Partners')
    SURVER_PARTNER = 2, _('Server Partners')


