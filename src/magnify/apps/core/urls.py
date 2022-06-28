"""Urls declarations for Magnify's core app."""

from django.conf import settings
from django.urls import path, re_path

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt import views as jwt_views

from magnify.apps.core import views

SchemaView = get_schema_view(
    openapi.Info(
        title="Magnify API",
        default_version="v1",
        description="""This is the schema for the Magnify API.

            All routes are protected by the JWT authentication except
            for "login", "refresh" and "create user".""",
    ),
    public=True,
    url=settings.API_URL,
    permission_classes=[permissions.AllowAny],
)


# To appear on the swagger URL,
# the views need to extend APIView from the rest_framework.views package.
urlpatterns = [
    # Authentication
    path("login/", jwt_views.TokenObtainPairView.as_view()),
    path("login/refresh/", jwt_views.TokenRefreshView.as_view()),
    # Users
    path("users/me/", views.UserViewSet.as_view({"get": "retrieve_me"})),
    path(
        "users/",
        views.UserViewSet.as_view({"post": "create"}),
        name="user-create",
    ),
    path(
        "users/<id>",
        views.UserViewSet.as_view(
            {
                "put": "update",
                "delete": "destroy",
                "get": "retrieve",
            }
        ),
    ),
    path(
        "users/<id>/password",
        views.UserViewSet.as_view(
            {
                "put": "change_password",
            }
        ),
    ),
    path("users/<id>/avatar", views.UserViewSet.as_view({"put": "update_avatar"})),
    # Swagger documentation
    path("token/<room>", views.RoomTokenView.as_view()),
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        SchemaView.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        SchemaView.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$", SchemaView.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]
