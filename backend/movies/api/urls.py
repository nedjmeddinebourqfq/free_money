from django.urls import path, include

urlpatterns = [
    path('admin/', include('movies.api.admin.urls')),
    path('mobile/', include('movies.api.mobile.urls')),
]
