from article.widgets import AdminImageWidget
from setting.models import FriendLink, Companion, FeedBack, UserDefined, Category
from django.contrib import admin


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'key', 'articles_count', 'status', 'active', 'top_no', 'description')
    ordering = ('-top_no',)


@admin.register(FriendLink)
class FriendLinkAdmin(admin.ModelAdmin):
    list_display = ('title', 'href')

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'cover':
            request = kwargs.pop("request", None)
            kwargs['widget'] = AdminImageWidget
            return db_field.formfield(**kwargs)
        return super(FriendLinkAdmin, self).formfield_for_dbfield(db_field, **kwargs)


@admin.register(Companion)
class CompanionAdmin(admin.ModelAdmin):
    list_display = ('title', 'href')


@admin.register(FeedBack)
class FeedbackAdmin(admin.ModelAdmin):
    search_fields = ('content', 'contact',)
    list_display = ('content', 'contact', 'creator')


@admin.register(UserDefined)
class UserDefinedAdmin(admin.ModelAdmin):
    list_display = ('type', 'created_at')

