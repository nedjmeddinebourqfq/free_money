from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('partners', views.AdminOfferPartnerAPI)
urlpatterns = [

]
urlpatterns += router.urls
