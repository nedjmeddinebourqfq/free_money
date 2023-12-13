from drf_spectacular.utils import extend_schema
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from coreapp.api.admin import serializers
from coreapp.models import User


class AdminUserAPI(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.DestroyModelMixin, mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin):
    permission_classes = [IsAdminUser]
    serializer_class = serializers.AdminUserListSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        return User.objects.filter(role=1)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return serializers.AdminUserDetailSerializer
        elif self.action == 'partial_update':
            return serializers.AdminUserUpdateSerializer
        return self.serializer_class
