# # coding=utf-8
# from django.db import models
# from django.contrib.auth.models import User
# from django.contrib.auth.admin import UserAdmin
# import datetime
# #  参考 http://blog.csdn.net/svalbardksy/article/details/51199707
# from django.db.models import Model
# from django.conf import settings
#
#
# class ProfileBase(type):
#     def __new__(cls, name, bases, attrs):
#         module = attrs.pop('__module__')
#         parents = [b for b in bases if isinstance(b, ProfileBase)]
#         if parents:
#             fields = []
#             for obj_name, obj in attrs.items():
#                 if isinstance(obj, models.Field): fields.append(obj_name)
#                 User.add_to_class(obj_name, obj)
#             UserAdmin.fieldsets = list(UserAdmin.fieldsets)
#             UserAdmin.fieldsets.append((name, {'fields': fields}))
#         return super(ProfileBase, cls).__new__(cls, name, bases, attrs)
#
#
# class Profile(object):
#     __metaclass__ = ProfileBase
#
#
# # 订阅者、投稿者、作者、编辑、管理员
# class MyProfile(Profile):
#     SEX_SET = (
#         (0, '保密'),
#         (1, '男'),
#         (2, '女'),
#     )
#
#     realname = models.CharField('真实姓名', max_length=255, blank=True)
#     sex = models.IntegerField('性别', choices=SEX_SET, default=0)
#     birthday = models.DateField('生日', null=True, blank=True)
#     company = models.CharField('所在公司', max_length=255, blank=True)
#     position = models.CharField('职位', max_length=255, blank=True)
#     address = models.CharField('居住地址', max_length=255, blank=True)
#     phone = models.CharField('手机号码', max_length=26, blank=True)
#     country = models.CharField('手机号码前缀', default='+86', max_length=26, blank=True)
#
#     sina = models.CharField('微博', max_length=255, blank=True)
#     wechat = models.CharField('微信', max_length=255, blank=True)
#     qq = models.CharField('QQ', max_length=255, blank=True)
#     alipay = models.CharField('alipay', max_length=255, blank=True)
#
#     avatar = models.ImageField('头像', default=settings.DEFAULT['avatar'])
#     nickname = models.CharField('昵称', max_length=255, blank=True)
#     signature = models.CharField('个性签名', max_length=255, blank=True)
#
#
#     # 可以在这里添加auth_user表的扩展字段
#     def display_name(self):
#         return self.nickname or self.username
#
#     def is_today_birthday(self):
#         return self.birthday.date() == datetime.date.today()
#
#     @property
#     def avatar_url(self):
#         if self.avatar and hasattr(self.avatar, 'url'):
#             return self.avatar.url
#         return '#'
#
#     def __unicode__(self):
#         return self.display_name()
#
