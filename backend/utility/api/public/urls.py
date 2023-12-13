from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('global_settings', views.PublicWebsiteAPI)
urlpatterns = [

]
urlpatterns += router.urls
