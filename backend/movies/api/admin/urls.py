from django.urls import path
from rest_framework import routers

from movies.api.admin.views import AdminMovieAPI

router = routers.DefaultRouter()

router.register('movie', AdminMovieAPI)

urlpatterns = [

]

urlpatterns += router.urls
