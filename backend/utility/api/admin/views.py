from rest_framework.response import Response
from rest_framework import viewsets, mixins, views, status
from rest_framework.permissions import AllowAny, IsAdminUser
from coreapp.models import User
from offer_partner.models import OfferPartner
from . import serializers
from ...models import GlobalSettings


class SettingsAPI(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin):
    permission_classes = [IsAdminUser]
    serializer_class = serializers.AdminSettingsSerializer
    queryset = GlobalSettings.objects.all()


class DashboardInformationAPI(views.APIView):
    permission_classes = [IsAdminUser, ]

    def get(self, request):
        total_user = User.objects.filter(role=1).count()
        total_partner = OfferPartner.objects.all().count()
        new_offer = OfferPartner.objects.filter(type=0).count()
        offer_partner = OfferPartner.objects.filter(type=1).count()
        surver_partner = OfferPartner.objects.filter(type=2).count()

        data = {
            'total_user': total_user,
            'total_partner': total_partner,
            'new_offer': new_offer,
            'offer_partner': offer_partner,
            'surver_partner': surver_partner,
        }

        return Response(data, status=status.HTTP_200_OK)
