from django.urls import path, include

urlpatterns = [
    path('admin/', include('balance.api.admin.urls')),
    path('mobile/', include('balance.api.mobile.urls'))
]
