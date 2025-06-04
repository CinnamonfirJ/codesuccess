from django.contrib.auth.models import User 
from rest_framework import serializers
from .models import Profile, Post  # Assuming Profile model is defined in models.py

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'email', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'created_at']
        extra_kwargs = {'author': {'read_only': True}} # Prevent direct modification of author field

    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError("Content cannot be empty.")
        return value

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['author'] = request.user
        return Post.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance













class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile # Assuming Profile model is defined in models.py
        fields = ['image']

    def validate_image(self, value):
        if not value.name.endswith(('.png', '.jpg', '.jpeg')):
            raise serializers.ValidationError("Image must be a PNG or JPEG file.")
        return value

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance