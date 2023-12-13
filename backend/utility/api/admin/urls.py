from django.urls import path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('site-info', views.SettingsAPI)

urlpatterns = [
    path('report/', views.DashboardInformationAPI.as_view())
]

urlpatterns += router.urls
