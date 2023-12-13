from rest_framework import serializers
from movies.models import Movie


class UserMovieListSerializer(serializers.ModelSerializer):
    creator = serializers.CharField(source='get_creator_name', read_only=True)

    class Meta:
        model = Movie
        fields = ('id', 'title', 'genre', 'year', 'creator')
