from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("users/", views.users, name="users"),
    path("applications/import_csv", views.import_csv, name="import_csv"),
]