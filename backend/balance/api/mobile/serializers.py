from rest_framework import serializers

from ...models import Balance


class UserBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('points',)

    def create(self, validated_data):
        user = self.context['request'].user
        balance = Balance.objects.create(user=user, **validated_data)
        return balance

    def validate(self, attrs):
        user = self.context['request'].user
        existing_balance = Balance.objects.filter(user=user).exists()
        if existing_balance:
            raise serializers.ValidationError("Balance for this user already exists.")
        return attrs
