#coding:utf-8
from django.conf.urls import url,patterns

from views import *

urlpatterns=patterns(
    "",
    # ajax调用获取数据
    url(r"^article_list/", article_list, name="article_list"),
    url(r"^tag_article_list/", article_list, name="tag_article_list"),
    url(r"^get_cy_list/", article_list, name="get_cy_list"),
)