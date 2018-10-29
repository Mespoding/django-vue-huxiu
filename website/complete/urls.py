from django.conf.urls import include, url

# place app url patterns here
from django.conf.urls import patterns, url
from views import *

urlpatterns=patterns(
    "",
    url(r"^weibo/", weibo, name="weibo"),
    url(r"^qq/", weibo, name="qq"),
    url(r"^alipay/", weibo, name="alipay"),
    url(r"^weixin/", weibo, name="weixin"),
)
