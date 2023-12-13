from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from ...models import GlobalSettings


class AdminSettingsSerializer(serializers.ModelSerializer):
    logo_url = serializers.CharField(source='get_logo_url', read_only=True)

    class Meta:
        model = GlobalSettings
        fields = '__all__'

    def validate(self, attrs):
        existing_settings = GlobalSettings.objects.first()
        if existing_settings:
            raise ValidationError("Only one GlobalSettings object is allowed.")
        return attrs
