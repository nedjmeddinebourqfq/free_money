from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from coreapp.permissions import IsUser
from . import serializers
from ...models import Balance


class UserBalanceAPI(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    permission_classes = [IsUser, ]
    queryset = Balance.objects.all()
    serializer_class = serializers.UserBalanceSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Balance.objects.filter(user=user)
        return queryset
