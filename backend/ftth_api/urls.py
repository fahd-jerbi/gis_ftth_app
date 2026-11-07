from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r"projects", ProjectViewSet, basename="project")

urlpatterns = [
    # project url
    path("", include(router.urls)),
    # ducts url
    path(
        "projects/<uuid:project_id>/ducts/",
        DuctViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "projects/<uuid:project_id>/ducts/<uuid:pk>/",
        DuctViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    # subducts url
    path(
        "projects/<uuid:project_id>/subducts/",
        SubductViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "projects/<uuid:project_id>/subducts/<uuid:pk>/",
        SubductViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    # POPArea url
    path(
        "projects/<uuid:project_id>/pop-areas/",
        POPAreaViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "projects/<uuid:project_id>/pop-areas/<uuid:pk>/",
        POPAreaViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    # DPArea url
    path(
        "projects/<uuid:project_id>/dp-areas/",
        DPAreaViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "projects/<uuid:project_id>/dp-areas/<uuid:pk>/",
        DPAreaViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    # DP url
    path(
        "projects/<uuid:project_id>/dps/",
        DPViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "projects/<uuid:project_id>/dps/<uuid:pk>/",
        DPViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
    # House url
    path(
        "projects/<uuid:project_id>/houses/",
        HouseViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "projects/<uuid:project_id>/houses/<uuid:pk>/",
        HouseViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
]
