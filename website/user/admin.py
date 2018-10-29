from django.contrib import admin
from django.contrib.auth.models import User


# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ('username', 'nickname', 'sex', 'date_joined', 'last_login', 'group')
#     list_filter = ('status', 'group')
#     search_fields = ('username', 'nickname', 'signature')
#     ordering = ('-date_joined',)