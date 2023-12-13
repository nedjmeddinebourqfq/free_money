from rest_framework.serializers import ModelSerializer

from utility.models import GlobalSettings


class PublicWebsiteSerializer(ModelSerializer):
    class Meta:
        model = GlobalSettings
        fields = '__all__'
