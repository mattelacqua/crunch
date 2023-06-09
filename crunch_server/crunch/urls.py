from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("users/", views.users, name="users"),
    path("applications/read_csv", views.applications, name="applications"),
]