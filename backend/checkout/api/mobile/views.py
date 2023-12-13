from rest_framework import viewsets, mixins
from coreapp.permissions import IsUser
from ...models import CashOutRequest
from . import serializers


class UserCashOutRequestAPI(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    permission_classes = [IsUser, ]
    queryset = CashOutRequest.objects.all()
    serializer_class = serializers.UserCashOutRequestSerializer

    def get_queryset(self):
        return CashOutRequest.objects.filter(user=self.request.user).order_by('-created_at')

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.CashoutListSerializer
        return self.serializer_class
