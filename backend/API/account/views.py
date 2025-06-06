from django.shortcuts import render
from django.contrib.auth.models import User 
from rest_framework import generics
from .serializers import UserSerializer, PostSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Profile, Post  # Assuming Profile and Post models are defined in models.py
from rest_framework.response import Response
# Create your views here.


class PostListViewCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            raise serializer.ValidationError(serializer.errors)


class DeletePostView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)
     

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionError("You do not have permission to delete this post.")
        instance.delete()





class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    post = Post.objects.all()
    serializer_class = PostSerializer

    permission_classes = [IsAuthenticated]


    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            raise serializer.ValidationError(serializer.errors)


  
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
