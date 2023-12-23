from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAdminUser

from coreapp.permissions import IsUser
from offer_partner.api.admin.serializers import AdminOfferPartnerSerializer, AdminCompanySerializer
from offer_partner.models import OfferPartner, Company


class AdminOfferPartnerAPI(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = AdminOfferPartnerSerializer
    queryset = OfferPartner.objects.all().order_by('-created_at')


class AdminCompanyAPI(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = AdminCompanySerializer
    queryset = Company.objects.all().order_by('-created_at')
