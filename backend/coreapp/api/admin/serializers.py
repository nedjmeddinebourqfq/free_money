from rest_framework import serializers
from django.conf import settings
from ...models import User


class AdminUserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'mobile', 'is_verified', 'is_active')


class AdminUserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'mobile', 'dob', 'wallet', 'is_verified', 'is_approved', 'is_active',
                  'created_at', 'bio', 'image')


class AdminUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('is_active',)

    def update(self, instance, validated_data):
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance
