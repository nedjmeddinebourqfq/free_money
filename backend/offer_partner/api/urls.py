from django.urls import path, include

urlpatterns = [
    path('admin/', include('offer_partner.api.admin.urls')),
    path('mobile/', include('offer_partner.api.mobile.urls'))
]
