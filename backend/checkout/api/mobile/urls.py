from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('cashout', views.UserCashOutRequestAPI)

urlpatterns = [

]
urlpatterns += router.urls
