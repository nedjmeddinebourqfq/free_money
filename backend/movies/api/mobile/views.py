from rest_framework import viewsets, mixins

from ...models import Movie
from . import serializers


class UserMovieAPI(viewsets.GenericViewSet, mixins.ListModelMixin):
    # permission_classes = [IsAdminUser]
    queryset = Movie.objects.all().order_by('-created_at')
    serializer_class = serializers.UserMovieListSerializer

