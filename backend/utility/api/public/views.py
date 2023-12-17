from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from utility.api.public.serializers import PublicWebsiteSerializer
from utility.models import GlobalSettings


class PublicWebsiteAPI(viewsets.GenericViewSet, mixins.ListModelMixin):
    permission_classes = [AllowAny, ]
    queryset = GlobalSettings.objects.all()
    serializer_class = PublicWebsiteSerializer
