from rest_framework import serializers

from coreapp import email_utils
from coreapp.models import User
from ...models import Balance


class UserBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('points',)

    def create(self, validated_data):
        user = self.context['request'].user
        points = validated_data.get('points')
        balance = Balance.objects.create(user=user, **validated_data)
        email_utils.send_cashout_email(user,
                                       data=f'Mr. {user} request send to admin to add the amount of {points} points')
        admins = User.objects.filter(role=0, is_staff=True, is_superuser=True)
        for admin in admins:
            email_utils.send_cashout_email(admin.email, data=f'Mr. {user} request to add the amount of {points} points')
        return balance
