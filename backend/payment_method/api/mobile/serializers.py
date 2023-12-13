from rest_framework import serializers

from payment_method.models import PaymentMethod


class UserPaymentMethodSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source='get_image_url', read_only=True)

    class Meta:
        model = PaymentMethod
        fields = ('name', 'image', 'image_url', 'type')
