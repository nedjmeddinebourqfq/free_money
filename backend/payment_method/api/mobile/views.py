from rest_framework import viewsets, mixins
from coreapp.permissions import IsUser
from payment_method.api.mobile import serializers
from payment_method.models import PaymentMethod


class UserPaymentMethodAPI(viewsets.GenericViewSet, mixins.ListModelMixin):
    serializer_class = serializers.UserPaymentMethodSerializer
    permission_classes = [IsUser, ]
    queryset = PaymentMethod.objects.filter(is_active=True).order_by('-created_at')
