from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from django_filters import rest_framework as dj_filters
from . import serializers
from ...models import Movie
from .. import filters


class AdminMovieAPI(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Movie.objects.all().order_by('-created_at')
    serializer_class = serializers.AdminMovieCreateSerializer
    filter_backends = (dj_filters.DjangoFilterBackend,)
    filterset_class = filters.MovieFilter
