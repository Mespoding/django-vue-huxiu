# coding=utf-8
from django.contrib import admin
from django import forms
from django.forms import CheckboxSelectMultiple

from article.widgets import AdminImageWidget
from django.forms import Textarea
from models import *


@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    search_fields = ('name',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ('name', 'description')
    list_display = ('name', 'articles_count', 'description')


class MyArticleForm(forms.Form):
    title = forms.ChoiceField()
    pass


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    # form = MyArticleForm
    radio_fields = {"show_in_home": admin.HORIZONTAL,
                    "top_in_home": admin.HORIZONTAL,
                    "short_story": admin.HORIZONTAL,
                    "status": admin.HORIZONTAL,
                    }
    # formfield_overrides = {
    #     models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    # }

    list_display = (
        'title', 'creator', 'category', 'status',
        'publish_at', 'top_in_home', 'show_in_home', 'short_story',)
    list_filter = ('status', 'category')
    search_fields = ('title', 'description', 'content')
    ordering = ('-top_in_home', '-show_in_home', '-publish_at', '-short_story')

    fieldsets = (
        ('', {
            'fields': (
                'category',
                'title',
                'keywords',
                'source',
                'author',
                'creator',
                'editor',
                'content',
                'description',
                'short_story',
                'show_in_home',
                'top_in_home',
                'cover',
                'publish_at',
                'status'),
        }),
    )

    # 保存时的额外操作
    def save_model(self, request, obj, form, change):
        if 'top_in_home' in form.changed_data:
            obj.top_in_home_time = datetime.now()

        super(ArticleAdmin, self).save_model(request, obj, form, change)

    def get_changeform_initial_data(self, request):
        data = super(ArticleAdmin, self).get_changeform_initial_data(request)
        data['creator'] = request.user
        data['editor'] = request.user
        return data

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = ('status',)
        if request.user and request.user.is_superuser:
            readonly_fields = ()
        return readonly_fields

    # 更改字段的默认显示控件
    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'cover':
            request = kwargs.pop("request", None)
            kwargs['widget'] = AdminImageWidget
            return db_field.formfield(**kwargs)
        if db_field.name == 'description':
            request = kwargs.pop("request", None)
            kwargs['widget'] = Textarea(attrs={"cols": 40, "rows": 2})
            return db_field.formfield(**kwargs)
        # if db_field.name == 'tags':
        #     request = kwargs.pop("request", None)
        #     kwargs['widget'] = AdminTagsWidget
        #     return db_field.formfield(**kwargs)

        return super(ArticleAdmin, self).formfield_for_dbfield(db_field, **kwargs)

        # # 根据不同用户显示不同列表
        # def changelist_view(self, request, extra_context=None):
        #     user = request.user
        #     if user.is_superuser:
        #         self.list_display = ['field1', 'field2']
        #     else:
        #         self.list_display = ['field1']
        #     return super(ArticleAdmin, self).changelist_view(request, extra_context=None)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('content', 'article', 'creator', 'created_at',)

# @admin.register(Message)
# class MessageAdmin(admin.ModelAdmin):
#     list_display = ('content', 'creator', 'receiver', 'type',)
#
