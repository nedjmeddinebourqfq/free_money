from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from payment_method.api.admin import serializers
from payment_method.models import PaymentMethod


class AdminPaymentMethodAPI(viewsets.ModelViewSet):
    serializer_class = serializers.AdminPaymentMethodSerializer
    permission_classes = [IsAdminUser, ]
    queryset = PaymentMethod.objects.all().order_by('-created_at')
