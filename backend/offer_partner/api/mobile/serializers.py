from ...models import OfferPartner
from rest_framework import serializers


class UserOfferPartnerSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source='get_image_url', read_only=True)

    class Meta:
        model = OfferPartner
        fields = ('id', 'title', 'description', 'image', 'image_url', 'price', 'type')
