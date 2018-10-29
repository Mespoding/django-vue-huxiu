# coding:utf-8
import datetime
import functools
import json
import logging
import random

import requests
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import resolve, reverse_lazy
from django.http import HttpResponsePermanentRedirect
from django.utils.decorators import method_decorator
from django.views.generic import View, ListView, TemplateView, DetailView
from django.views.generic.base import ContextMixin, TemplateResponseMixin
from django.core.paginator import InvalidPage, Paginator

from setting.models import UserDefined

__author__ = 'sanyang'


def check_code(code):
    return 200 <= code <= 209


def check_permisions(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):  # args 是肯定会有的，但 kwargs 不一定
        view = args[0]
        if isinstance(view, View):  # 兼容视图类和方法
            req = view.request
        else:
            req = args[0]
        current_path = req.META["PATH_INFO"]
        match = resolve(current_path, settings.ROOT_URLCONF)

        perm = match.url_name
        perms = req.session.get('perms')
        if not perms or perm not in perms:
            return HttpResponsePermanentRedirect(reverse_lazy("customer:no_auth"))

        # if not req.session.get('user', None):
        #     logging.info('#######  user is not in session, portal will logout  #####')
        #     return HttpResponsePermanentRedirect(reverse_lazy("customer:logout"))

        kwargs['customer_id'] = req.user.id
        kwargs['datacenter_id'] = req.session['datacenter']['default']['key']
        kwargs['project_id'] = req.session['project']['default']['id']
        return func(*args, **kwargs)

    return wrapper


class JsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, datetime.date):
            return obj.strftime('%Y-%m-%d')
        else:
            return json.JSONEncoder.default(self, obj)


class ViewBase(View):
    # @method_decorator(login_required)
    # @check_permisions
    def dispatch(self, request, *args, **kwargs):
        return super(ViewBase, self).dispatch(request, *args, **kwargs)

    @property
    def domain(self):
        return 'http://' + self.request.get_host()

    @property
    def input(self):
        """获取request传递过的所有参数"""
        i = {}
        # args = self.request.REQUEST
        args = self.request.GET or self.request.POST
        for item in args:
            i[item] = args[item]
        return i

    def get_argument(self, arg_name, default=''):
        if arg_name in self.input:
            return self.input[arg_name]
        else:
            return default

    def get_int(self, arg_name, default=0):
        if arg_name in self.input:
            return int(self.input[arg_name])
        else:
            return default

    def get_url_name(self):
        request = self.request
        current_path = request.META["PATH_INFO"]
        match = resolve(current_path, settings.ROOT_URLCONF)
        url_name = match.url_name
        return url_name

    def append_to_context(self, context):
        self.params = self.input.copy()
        context.update(self.params)
        context['request'] = self.request
        metas = UserDefined.objects.filter(type=6)
        if metas.count() > 0:
            context['metas'] = metas[0].content1

        if self.request.user.is_authenticated():
            context['uid'] = self.request.user.id
        else:
            context['uid'] = 0
        context['aid'] = 0


class ListViewBase(ListView, ViewBase):
    page = 1
    per_page = 2
    params = {}
    context_object_name = 'object_list'

    def get_paginate_by(self, queryset):
        return self.request.GET.get('per_page')

    def get_context_data(self, **kwargs):
        context = super(ListViewBase, self).get_context_data(**kwargs)
        self.append_to_context(context)
        self.params['page'] = self.request.GET.get('page')
        self.params['per_page'] = self.request.GET.get('per_page')
        context = dict(context, **self.params)
        return context


class TemplateViewBase(TemplateView, ViewBase):
    per_page = 5
    params = {}

    def get_context_data(self, **kwargs):
        context = super(TemplateViewBase, self).get_context_data(**kwargs)
        self.append_to_context(context)
        return context


def is_mobile(request):
    agent = request.META['HTTP_USER_AGENT']
    # mac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    # iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4'
    # wechat: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H143 MicroMessenger/6.5.5 NetType/WIFI Language/zh_CN'
    # android: MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
    if "iPhone" in agent or "Android" in agent or "MicroMessenger" in agent:
        return True
    return False


class ApplyMobileMiXIN(TemplateResponseMixin):
    def get_template_names(self):
        if is_mobile(self.request):
            self.template_name = "m_" + self.template_name
        return self.template_name


def isme_required(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):  # args 是肯定会有的，但 kwargs 不一定
        view = args[0]
        if isinstance(view, View):  # 兼容视图类和方法
            req = view.request
        else:
            req = args[0]

        # 未登录的，或者参数user_id跟当前用户不匹配的，都跳转到主页
        if req.user.id != int(kwargs.get('user_id')):
            return HttpResponsePermanentRedirect(reverse_lazy("index"))

        return func(*args, **kwargs)

    return wrapper


def create_verify_code():
    chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    x = random.choice(chars), random.choice(chars), random.choice(chars), random.choice(chars), random.choice(chars), random.choice(chars)
    verifyCode = "".join(x)
    return verifyCode


def send_verify_code(phone):
    captcha = create_verify_code()
    params = dict(
        ParamString=json.dumps({"code": captcha}),  # 短信模板就收的参数
        RecNum=phone,  # 接受短信的手机，多个用英文逗号分隔
        TemplateCode=settings.SMS['TemplateCode'],  # 模板code
        SignName=settings.SMS['SignName']  # 签名，用于显示在短信后面，会被【】包裹
    )
    res = requests.get(settings.SMS['URL'],
                       params=params,
                       headers={'Authorization': 'APPCODE %s' % settings.SMS['APPCODE']},
                       timeout=5)
    logging.info(res.status_code)
    logging.info(res.content)
    if res.status_code == 200:
        json_res = res.json()
        if json_res['success']:
            return captcha
