from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAdminUser

from . import serializers
from ...models import Balance


class AdminBalanceAPI(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin):
    permission_classes = [IsAdminUser, ]
    queryset = Balance.objects.all()
    serializer_class = serializers.AdminBalanceAPI

    def get_serializer_class(self):
        if self.action == 'partial_update':
            return serializers.AdminUpdateBalanceAPI
        elif self.action == 'update':
            return serializers.AdminUpdateBalanceAPI
        return self.serializer_class
