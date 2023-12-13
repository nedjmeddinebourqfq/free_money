from rest_framework import routers

from payment_method.api.mobile.views import UserPaymentMethodAPI

router = routers.DefaultRouter()
router.register('payment-method', UserPaymentMethodAPI)

urlpatterns = [

]
urlpatterns += router.urls
