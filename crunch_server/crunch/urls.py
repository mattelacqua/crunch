from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("users/", views.user_lookup, name="user_lookup"),
]