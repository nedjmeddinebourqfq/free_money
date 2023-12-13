from rest_framework import serializers
from ...models import CashOutRequest


class UserCashOutRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashOutRequest
        fields = ('amount', 'payment_method', 'payment_address')
        read_only_fields = ('status',)

    def create(self, validated_data):
        user = self.context['request'].user
        cash_out = CashOutRequest.objects.create(user=user, **validated_data)
        cash_out.save()
        return cash_out


class CashoutListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashOutRequest
        fields = '__all__'
