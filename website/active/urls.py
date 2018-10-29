# coding:utf-8
from django.conf.urls import url, patterns
from views import *

urlpatterns = patterns(
    "",
    url(r"^list/", ActiveListView.as_view(), name="list"),
    url(r"^pics/", pics, name="pics"),
    url(r"^(?P<active_id>.+)$", ActiveView.as_view(), name="details"),
)
