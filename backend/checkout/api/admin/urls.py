from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('cashout-request', views.AdminCashOutRequestAPI)
urlpatterns = [

]
urlpatterns += router.urls
