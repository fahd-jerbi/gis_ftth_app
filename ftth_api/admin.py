from django.contrib.gis import admin
from .models import Project, POPArea, DPArea, Duct, Subduct, DP, House


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "created_at"]
    search_fields = ["name"]


@admin.register(POPArea)
class POPAreaAdmin(admin.GISModelAdmin):
    list_display = ["id", "project"]
    list_filter = ["project"]


@admin.register(DPArea)
class DPAreaAdmin(admin.GISModelAdmin):
    list_display = ["id", "project"]
    list_filter = ["project"]


@admin.register(Duct)
class DuctAdmin(admin.GISModelAdmin):
    list_display = ["id", "project"]
    list_filter = ["project"]


@admin.register(Subduct)
class SubductAdmin(admin.GISModelAdmin):
    list_display = ["id", "project"]
    list_filter = ["project"]


@admin.register(DP)
class DPAdmin(admin.GISModelAdmin):
    list_display = ["id", "project"]
    list_filter = ["project"]


@admin.register(House)
class HouseAdmin(admin.GISModelAdmin):
    list_display = ["id", "project"]
    list_filter = ["project"]
