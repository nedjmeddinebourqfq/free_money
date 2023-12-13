from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('balance', views.UserBalanceAPI)

urlpatterns = [

]
urlpatterns += router.urls

