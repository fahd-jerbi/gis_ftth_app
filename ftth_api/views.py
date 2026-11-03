from django.contrib.gis.db.models.functions import Transform
from django.contrib.gis.db.models import Extent
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .models import Project, POPArea, DPArea, Duct, Subduct, DP, House
from .serializers import (
    ProjectSerializer,
    DuctSerializer,
    SubductSerializer,
    POPAreaSerializer,
    DPAreaSerializer,
    DPSerializer,
    HouseSerializer,
)


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=True, methods=["get"], url_path="bbox", url_name="bbox")
    def bbox(self, request, pk=None):

        project_queryset = self.get_object()

        result = POPArea.objects.filter(project=project_queryset).aggregate(
            bbox=Extent("geom")
        )

        if result["bbox"] is None:
            return Response(
                {"detail": "No geometry found for this project"},
                status=status.HTTP_204_NO_CONTENT,
            )

        xmin, ymin, xmax, ymax = result["bbox"]

        from django.contrib.gis.geos import Polygon

        bbox_geom = Polygon.from_bbox((xmin, ymin, xmax, ymax))
        bbox_geom.srid = 25832
        bbox_geom.transform(4326)

        env = bbox_geom.extent

        return Response(
            {
                "bbox": list(env),
                "center": [
                    (env[0] + env[2]) / 2,
                    (env[1] + env[3]) / 2,
                ],
            }
        )


class DuctViewSet(ModelViewSet):
    serializer_class = DuctSerializer

    def get_queryset(self):
        return Duct.objects.filter(project_id=self.kwargs["project_id"])

    def perform_create(self, serializer):
        serializer.save(project_id=self.kwargs["project_id"])


class SubductViewSet(ModelViewSet):
    serializer_class = SubductSerializer

    def get_queryset(self):
        return Subduct.objects.filter(project_id=self.kwargs["project_id"])

    def perform_create(self, serializer):
        serializer.save(project_id=self.kwargs["project_id"])


class POPAreaViewSet(ModelViewSet):
    serializer_class = POPAreaSerializer

    def get_queryset(self):
        return POPArea.objects.filter(project_id=self.kwargs["project_id"])

    def perform_create(self, serializer):
        serializer.save(project_id=self.kwargs["project_id"])


class DPAreaViewSet(ModelViewSet):
    serializer_class = DPAreaSerializer

    def get_queryset(self):
        return DPArea.objects.filter(project_id=self.kwargs["project_id"])

    def perform_create(self, serializer):
        serializer.save(project_id=self.kwargs["project_id"])


class DPViewSet(ModelViewSet):
    serializer_class = DPSerializer

    def get_queryset(self):
        return DP.objects.filter(project_id=self.kwargs["project_id"])

    def perform_create(self, serializer):
        serializer.save(project_id=self.kwargs["project_id"])


class HouseViewSet(ModelViewSet):
    serializer_class = HouseSerializer

    def get_queryset(self):
        return House.objects.filter(project_id=self.kwargs["project_id"])

    def perform_create(self, serializer):
        serializer.save(project_id=self.kwargs["project_id"])
