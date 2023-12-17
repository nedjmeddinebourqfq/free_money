from rest_framework import serializers
from ...models import CashOutRequest


class AdminCashOutRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='get_username', read_only=True)

    class Meta:
        model = CashOutRequest
        fields = '__all__'


class AdminCashOutRequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashOutRequest
        fields = ('status', )
