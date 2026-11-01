from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework.serializers import ModelSerializer
from .models import Project, POPArea, DPArea, Duct, Subduct, DP, House


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "name", "description", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]


class DuctSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Duct
        fields = [
            "id",
            "project",
            "name",
            "type",
            "capacity",
            "color",
            "geom",
            "created_at",
            "updated_at",
        ]
        geo_field = "geom"
        read_only_fields = ["id", "created_at", "updated_at"]


class SubductSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Subduct
        fields = [
            "id",
            "project",
            "name",
            "color",
            "geom",
            "created_at",
            "updated_at",
        ]
        geo_field = "geom"
        read_only_fields = ["id", "created_at", "updated_at"]


class POPAreaSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = POPArea
        fields = [
            "id",
            "project",
            "name",
            "color",
            "geom",
            "created_at",
            "updated_at",
        ]
        geo_field = "geom"
        read_only_fields = ["id", "created_at", "updated_at"]


class DPAreaSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = DPArea
        fields = [
            "id",
            "project",
            "name",
            "color",
            "geom",
            "created_at",
            "updated_at",
        ]
        geo_field = "geom"
        read_only_fields = ["id", "created_at", "updated_at"]


class DPSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = DP
        fields = [
            "id",
            "project",
            "name",
            "type",
            "color",
            "geom",
            "created_at",
            "updated_at",
        ]
        geo_field = "geom"
        read_only_fields = ["id", "created_at", "updated_at"]


class HouseSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = House
        fields = [
            "id",
            "project",
            "name",
            "color",
            "address",
            "is_connected",
            "geom",
            "created_at",
            "updated_at",
        ]
        geo_field = "geom"
        read_only_fields = ["id", "created_at", "updated_at"]
