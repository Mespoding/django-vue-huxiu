#coding:utf-8
from django.conf.urls import url,patterns
from django.views.generic import TemplateView
from views import *

urlpatterns=patterns(
    "",
    url(r"^login/", login, name="login"),
    url(r"^logout/", logout, name="logout"),
    url(r"^is_exists/", is_exists, name="is_exists"),
    url(r"^register/", register, name="register"),
    url(r"^new_user_redirect_url/", new_user_redirect_registry, name="new_user_redirect_registry"),

    url(r"^usersetting/", usersetting, name="usersetting"),  # 修改资料
    url(r"^settings/base/", UserBaseInfo.as_view(), name="base"),
    url(r"^settings/account/", UserAccountInfo.as_view(), name="account"),
    url(r"^settings/bind/", UserBindInfo.as_view(), name="bind"),
)


