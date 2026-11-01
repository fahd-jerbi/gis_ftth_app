from django.contrib.gis import admin
from .models import Project, POPArea, Duct, DP


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "created_at"]
    search_fields = ["name"]


@admin.register(POPArea)
class POPAreaAdmin(admin.GISModelAdmin):
    list_display = ["id", "project"]
    list_filter = ["project"]


@admin.register(Duct)
class DuctAdmin(admin.GISModelAdmin):
    list_display = ["id", "project"]
    list_filter = ["project"]


@admin.register(DP)
class DPAdmin(admin.GISModelAdmin):
    list_display = ["id", "project"]
    list_filter = ["project"]
