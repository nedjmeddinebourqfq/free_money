from django.urls import path, include

urlpatterns = [
    path('admin/', include('payment_method.api.admin.urls')),
    path('mobile/', include('payment_method.api.mobile.urls')),
]
