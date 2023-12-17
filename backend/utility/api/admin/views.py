from django.db.models import Sum
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework import viewsets, mixins, views, status
from rest_framework.permissions import AllowAny, IsAdminUser

from checkout.models import CashOutRequest
from coreapp.models import User
from offer_partner.models import OfferPartner
from . import serializers
from ...models import GlobalSettings


class GlobalSettingsAPI(views.APIView):
    permission_classes = [IsAdminUser, ]

    @extend_schema(
        responses={200: serializers.GlobalSettingsSerializer}
    )
    def get(self, request):
        global_settings = GlobalSettings.objects.first()
        serializer = serializers.GlobalSettingsSerializer(global_settings)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        responses={200: serializers.GlobalSettingsSerializer},
        request=serializers.GlobalSettingsSerializer
    )
    def post(self, request):
        global_settings = GlobalSettings.objects.first()
        serializer = serializers.GlobalSettingsSerializer(data=request.data, instance=global_settings)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class DashboardInformationAPI(views.APIView):
    permission_classes = [IsAdminUser, ]

    def get(self, request):
        total_user = User.objects.filter(role=1).count()
        total_partner = OfferPartner.objects.all().count()
        total_cashout_result = CashOutRequest.objects.aggregate(total_cashout_amount=Sum('amount'))
        total_cashout = total_cashout_result['total_cashout_amount'] or 0
        new_offer = OfferPartner.objects.filter(type=0).count()
        offer_partner = OfferPartner.objects.filter(type=1).count()
        surver_partner = OfferPartner.objects.filter(type=2).count()

        data = {
            'total_user': total_user,
            'total_partner': total_partner,
            'new_offer': new_offer,
            'offer_partner': offer_partner,
            'surver_partner': surver_partner,
            'total_cashout': total_cashout
        }

        return Response(data, status=status.HTTP_200_OK)
