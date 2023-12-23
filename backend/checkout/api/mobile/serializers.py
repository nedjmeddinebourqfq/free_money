from rest_framework import serializers

from coreapp import email_utils
from coreapp.models import User
from coreapp.utils import auth_utils, otp_utils
from ...models import CashOutRequest


class UserCashOutRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashOutRequest
        fields = ('amount', 'payment_method', 'payment_address')
        read_only_fields = ('status',)

    def create(self, validated_data):
        user = self.context['request'].user
        amount = validated_data.get('amount')
        cash_out = CashOutRequest.objects.create(user=user, **validated_data)
        cash_out.save()
        email_utils.send_cashout_email(user, data=f'Mr. {user} requested a cashout amount of {amount}')
        admins = User.objects.filter(role=0, is_staff=True, is_superuser=True)
        for admin in admins:
            email_utils.send_cashout_email(admin.email, data=f'Mr. {user} requested a cashout amount of {amount}')
        return cash_out


class CashoutListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashOutRequest
        fields = '__all__'
