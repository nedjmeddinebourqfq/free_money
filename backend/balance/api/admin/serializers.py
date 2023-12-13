from rest_framework import serializers
from ...models import Balance


class AdminBalanceAPI(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Balance
        fields = ('id', 'user', 'points', 'username')


class AdminUpdateBalanceAPI(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('points',)
