from django.urls import path, include

app_name = 'api-v1'

urlpatterns = [
    path('auth/', include('coreapp.api.urls')),
    path('movie/', include('movies.api.urls')),
    path('balance/', include('balance.api.urls')),
    path('utility/', include('utility.api.urls')),
    path('offer/', include('offer_partner.api.urls')),
    path('payment-method/', include('payment_method.api.urls')),
    path('checkout/', include('checkout.api.urls')),
    # path('utility/', include('utility.urls')),
    # path('utility/', include('utility.urls')),
]
