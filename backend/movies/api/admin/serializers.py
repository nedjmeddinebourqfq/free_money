from rest_framework import serializers, status
from rest_framework.response import Response

from movies.models import Movie


class AdminMovieCreateSerializer(serializers.ModelSerializer):
    creator = serializers.CharField(source='get_creator_name', read_only=True)

    class Meta:
        model = Movie
        fields = ('id', 'title', 'genre', 'year', 'creator')

    def create(self, validated_data):
        user = self.context['request'].user
        print(validated_data)
        movie = Movie.objects.create(**validated_data, creator=user)
        movie.save()
        return movie
