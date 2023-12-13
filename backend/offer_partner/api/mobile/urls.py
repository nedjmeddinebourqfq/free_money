from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('partners', views.UserOfferPartnerAPI)
urlpatterns = [

]
urlpatterns += router.urls
