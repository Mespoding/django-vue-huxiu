# coding=utf-8
"""website URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
import os

from django.conf import settings
from django.conf.urls import include, url
from restfulapi.urls import router
from views import *

# import xadmin
# xadmin.autodiscover()

from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    url('', include('social_django.urls', namespace='social')),
    url(r'^grappelli/', include('grappelli.urls')),  # grappelli URLS
    url(r'^admin/', admin.site.urls),
    # url(r'^xadmin/', xadmin.site.urls),
    url(r'^ueditor/', include('DjangoUeditor.urls', namespace='ueditor')),

    url(r'^user/', include('user.urls', namespace="user")),
    url(r'^user_action/', include('user_action.urls', namespace="user_action")),
    url(r'^article/', include('article.urls', namespace="article")),
    url(r'^action/', include('action.urls', namespace="action")),
    url(r'^member/', include('member.urls', namespace="member")),
    url(r'^active/', include('active.urls', namespace="active")),
    url(r'^api/', include(router.urls, namespace="api")),

    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.STATICFILES_DIRS, 'show_indexes': True}),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),

    url(r'^about_us/$', AboutUsView.as_view(), name='about_us'),
    url(r'^join_us/$', JoinUsView.as_view(), name='join_us'),
    url(r'^partners/$', PartnersView.as_view(), name='partners'),
    url(r'^friend_links/$', FriendLinksView.as_view(), name='friend_links'),
    url(r'^ad_service/$', AdServiceView.as_view(), name='ad_service'),
    url(r'^questions/$', QuestionsView.as_view(), name='questions'),
]
