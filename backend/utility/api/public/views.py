from rest_framework import viewsets, mixins
from coreapp.permissions import IsUser
from utility.api.public.serializers import PublicWebsiteSerializer
from utility.models import GlobalSettings


class PublicWebsiteAPI(viewsets.GenericViewSet, mixins.ListModelMixin):
    permission_classes = [IsUser, ]
    queryset = GlobalSettings.objects.all()
    serializer_class = PublicWebsiteSerializer
