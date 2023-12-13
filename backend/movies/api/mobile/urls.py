from rest_framework import routers
from movies.api.mobile.views import UserMovieAPI

router = routers.DefaultRouter()
router.register('movie', UserMovieAPI)

urlpatterns = [

]

urlpatterns += router.urls
