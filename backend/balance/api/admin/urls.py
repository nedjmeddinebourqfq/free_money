from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('balance', views.AdminBalanceAPI)

urlpatterns = [

]
urlpatterns += router.urls

