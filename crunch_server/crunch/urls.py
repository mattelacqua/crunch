from django.urls import path

from . import views

urlpatterns = [
    path("", views.user.index, name="index"),
    path("users/", views.user.users, name="users"),
    path("applications/import_csv/", views.application.import_csv, name="import_csv"),
]