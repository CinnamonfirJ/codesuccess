from django.urls import path, include
from . import views
urlpatterns = [
    path('posts/', views.PostListViewCreate.as_view(), name='post-list'),
    path('posts/delete/<int:pk>/', views.DeletePostView.as_view(), name='post-delete'),
    path('posts/detail/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
]
