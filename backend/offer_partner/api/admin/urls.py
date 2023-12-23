from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('partners', views.AdminOfferPartnerAPI)
router.register('company', views.AdminCompanyAPI)
urlpatterns = [

]
urlpatterns += router.urls
