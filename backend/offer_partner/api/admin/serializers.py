from django.utils.safestring import mark_safe

from ...models import OfferPartner, Company
from rest_framework import serializers


class AdminOfferPartnerSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source='get_image_url', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = OfferPartner
        fields = (
            'id', 'title', 'description', 'image', 'image_url', 'link', 'price', 'type', 'is_active',
            'company', 'company_name')

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        api_key = instance.company.api_key
        representation['link'] = representation['link'].replace('[API_KEY]', api_key)
        return representation


class AdminCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
