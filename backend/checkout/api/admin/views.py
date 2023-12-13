from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from ...models import CashOutRequest
from . import serializers


class AdminCashOutRequestAPI(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser, ]
    queryset = CashOutRequest.objects.all().order_by('-created_at')
    serializer_class = serializers.AdminCashOutRequestSerializer
