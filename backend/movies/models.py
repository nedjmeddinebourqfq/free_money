from django.db import models
from django.utils.functional import cached_property

from coreapp.base import BaseModel


class Movie(BaseModel):
    creator = models.ForeignKey('coreapp.User', related_name='movies', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    year = models.IntegerField()

    class Meta:
        ordering = ['-id']

    @cached_property
    def get_creator_name(self):
        return self.creator.username
