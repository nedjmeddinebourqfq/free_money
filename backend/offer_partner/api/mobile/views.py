from rest_framework import viewsets, mixins

from coreapp.permissions import IsUser
from offer_partner.api.mobile.serializers import UserOfferPartnerSerializer
from offer_partner.models import OfferPartner


class UserOfferPartnerAPI(viewsets.GenericViewSet, mixins.ListModelMixin):
    permission_classes = [IsUser]
    serializer_class = UserOfferPartnerSerializer
    queryset = OfferPartner.objects.filter(is_active=True).order_by('-created_at')
