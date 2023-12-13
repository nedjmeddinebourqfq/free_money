from rest_framework import routers

from payment_method.api.admin.views import AdminPaymentMethodAPI

router = routers.DefaultRouter()
router.register('payment-method', AdminPaymentMethodAPI)

urlpatterns = [

]
urlpatterns += router.urls
