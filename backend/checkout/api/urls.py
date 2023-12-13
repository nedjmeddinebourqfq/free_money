from django.urls import path, include

urlpatterns = [
    path('admin/', include('checkout.api.admin.urls')),
    path('mobile/', include('checkout.api.mobile.urls'))
]
