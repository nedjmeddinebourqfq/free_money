from ...models import OfferPartner
from rest_framework import serializers


class UserOfferPartnerSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source='get_image_url', read_only=True)

    class Meta:
        model = OfferPartner
        fields = ('id', 'title', 'description', 'image', 'image_url', 'link', 'price', 'type')

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        api_key = instance.company.api_key
        user_id = str(self.context['request'].user.uid)
        representation['link'] = representation['link'].replace('[API_KEY]', api_key).replace('[USER_ID]', user_id)
        return representation
