from django.urls import path
from . import views
from rest_framework import routers



urlpatterns = [
    path('report/', views.DashboardInformationAPI.as_view()),
    path('site-info/', views.GlobalSettingsAPI.as_view())
]

