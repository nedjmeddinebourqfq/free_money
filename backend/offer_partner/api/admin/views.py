from rest_framework import viewsets, mixins

from coreapp.permissions import IsUser
from offer_partner.api.admin.serializers import AdminOfferPartnerSerializer
from offer_partner.models import OfferPartner


class AdminOfferPartnerAPI(viewsets.ModelViewSet):
    permission_classes = [IsUser]
    serializer_class = AdminOfferPartnerSerializer
    queryset = OfferPartner.objects.all().order_by('-created_at')
