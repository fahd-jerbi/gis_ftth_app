import uuid
from django.contrib.gis.db import models


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "project"


class Duct(models.Model):
    Duct_types = [("24x7", "24x7"), ("12x7", "12x7")]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="ducts")
    name = models.CharField(max_length=100, blank=True)
    type = models.CharField(max_length=50, choices=Duct_types)
    capacity = models.IntegerField(null=True, blank=True)
    color = models.CharField(max_length=20, blank=True)
    geom = models.LineStringField(srid=25832)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Duct {self.name}-{self.project} "

    class Meta:
        db_table = "duct"


class Subduct(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="subducts"
    )
    name = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=20, blank=True)
    geom = models.LineStringField(srid=25832)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Subduct {self.name}-{self.project}"

    class Meta:
        db_table = "subduct"


class POPArea(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="pop_area"
    )
    name = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=20, blank=True)
    geom = models.PolygonField(srid=25832)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"POPArea {self.name}-{self.project}"

    class Meta:
        db_table = "pop_area"


class DPArea(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="dp_area"
    )
    name = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=20, blank=True)
    geom = models.PolygonField(srid=25832)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"DPArea {self.name}-{self.project}"

    class Meta:
        db_table = "dp_area"


class DP(models.Model):
    DP_types = [("96", "96"), ("48", "48")]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="dp")
    name = models.CharField(max_length=100, blank=True)
    type = models.CharField(max_length=50, choices=DP_types)
    color = models.CharField(max_length=20, blank=True)
    geom = models.PointField(srid=25832)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"DP {self.name}-{self.project}"

    class Meta:
        db_table = "dp"


class House(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="house")
    name = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=20, blank=True)
    address = models.TextField(max_length=500, blank=True)
    is_connected = models.BooleanField(default=False)
    geom = models.PointField(srid=25832)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"House {self.name}-{self.project}"

    class Meta:
        db_table = "house"
