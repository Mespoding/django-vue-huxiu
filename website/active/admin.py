# coding=utf-8
from django.contrib import admin

from models import Active, ActiveFriendLink
from article.widgets import AdminImageWidget


@admin.register(Active)
class ActiveAdmin(admin.ModelAdmin):
    list_display = ('title', 'mark', 'created_at', 'status')

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name in ('cover', 'backgroud', 'time_table'):
            request = kwargs.pop("request", None)
            kwargs['widget'] = AdminImageWidget
            return db_field.formfield(**kwargs)
        return super(ActiveAdmin, self).formfield_for_dbfield(db_field, **kwargs)


@admin.register(ActiveFriendLink)
class ActiveFriendLinkAdmin(admin.ModelAdmin):
    list_display = ('title', 'href', 'active')

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'cover':
            request = kwargs.pop("request", None)
            kwargs['widget'] = AdminImageWidget
            return db_field.formfield(**kwargs)
        return super(ActiveFriendLinkAdmin, self).formfield_for_dbfield(db_field, **kwargs)
