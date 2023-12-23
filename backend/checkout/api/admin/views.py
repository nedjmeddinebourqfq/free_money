from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAdminUser
from django_filters import rest_framework as dj_filters
from .. import filters
from ... import constants
from ...models import CashOutRequest
from . import serializers


class AdminCashOutRequestAPI(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                             mixins.UpdateModelMixin):
    permission_classes = [IsAdminUser, ]
    queryset = CashOutRequest.objects.all().order_by('-created_at')
    serializer_class = serializers.AdminCashOutRequestSerializer

    def get_serializer_class(self):
        if self.action == 'partial_update':
            return serializers.AdminCashOutRequestUpdateSerializer
        elif self.action == 'update':
            return serializers.AdminCashOutRequestUpdateSerializer
        return self.serializer_class
