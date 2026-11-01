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


class DuctViewSet(ModelViewSet):
    serializer_class = DuctSerializer

    # explain what functions are provided from "ModelViewSet" ?
    def get_queryset(self):
        # what does this mean ?
        return Duct.objects.filter(project_id=self.kwargs["project_id"])

    def perform_create(self, serializer):
        # why is this not returning ?
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
