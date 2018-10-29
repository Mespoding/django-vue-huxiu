# coding=utf-8
import datetime
import logging

from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.shortcuts import render_to_response
from django.template import RequestContext

from forms import UserForm, RegisterForm, ChangepwdForm
from social_django.models import UserSocialAuth
from utils.util_web import TemplateViewBase

__author__ = 'sanyang'


# region 老代码
def login_validate(request, username='', password='', phone=''):
    res = False
    user = auth.authenticate(username=username, password=password, phone=phone)
    if user is not None:
        if user.is_active:
            auth.login(request, user)
            return True
    return res


def login(request, **kwargs):
    error = []
    if request.method == 'POST':
        next = request.POST.get("next", '/')
        form = UserForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            username = data['username']
            password = data['password']
            res = login_validate(request, username, password)
            if res:
                return HttpResponseRedirect(next)
            else:
                error.append('用户名或密码不正确')
    else:
        next = request.GET.get('next', '/')
        form = UserForm()
    return render_to_response('login.html', {'form': form, 'error': error, 'next': next},
                              context_instance=RequestContext(request))


def logout(request):
    auth.logout(request)
    return JsonResponse({'result': 1, 'msg': '欢迎访问云酒'})
    # next = reverse('index')
    # return HttpResponseRedirect(next)


def is_exists(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        value = request.POST.get('value')
        if 'username' == name:
            user = User.objects.filter(username=value)
        elif 'email' == name:
            user = User.objects.filter(email=value)
        else:
            user = None
        res = 'true' if user else 'false'
        return HttpResponse(res)


def new_user_redirect_registry(request):
    # {"username": "\u738b\u4e09\u6d0b",
    #  "access_token": "SAWPBNi934bDeejX5F7wn9axs76BMw9GHD0miJtbajKqXmrO43NCOaScNz8_72O60vFj_iiK_gYyk_FwBxU2sKVSd9Nb3__zOSzdn05osGk",
    #  "token_type": null,
    #  "profile_image_url": "http://wx.qlogo.cn/mmopen/iaoXhnohaAe768NJpL6JsQ0sGrcOibEYrhOBDKdCZOnciaEiahZiaZKwA6weuhu5U1H8eickRPiaW5krKq6ESfbicb3z9ibmJ9icabC5R9/0",
    #  "auth_time": 1492877339}
    users = UserSocialAuth.objects.filter(user_id=request.user.id)
    if users.count() > 0:
        user = users[0].extra_data
        return render_to_response("new_user_redirect_url.html",
                                  {"user_id": request.user.id,
                                   "profile_image_url": user.get("profile_image_url"),
                                   "username": user.get("username"),
                                   "aid": 0,
                                   },
                                  context_instance=RequestContext(request))
    else:
        return HttpResponseRedirect("/")


def register(request):
    error = []
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            username = data['username']
            email = data['email']
            password = data['password']
            password1 = data['password1']

            if not User.objects.all().filter(username=username):
                if form.pwd_validate(password, password1):
                    user = User.objects.create_user(username, email, password)
                    user.save()
                    login_validate(request, username, password)
                    return HttpResponseRedirect('/')  # 注册完成后直接跳转到主页
                else:
                    error.append('请输入相同的密码')
            else:
                error.append('用户名已存在，请重新输入一个用户名')
    else:
        form = RegisterForm()
    return render_to_response('customer/login.html', {'form': form, 'error': error})


def changepassword(request, username):
    error = []
    if request.method == 'POST':
        form = ChangepwdForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = auth.authenticate(username=username, password=data['old_pwd'])
            if user is not None:
                if data['new_pwd'] == data['new_pwd1']:
                    newuser = User.objects.get(username__exact=username)
                    newuser.set_password(data['new_pwd'])
                    newuser.save()
                    return HttpResponseRedirect('/login/')
                else:
                    error.append('请输入相同的密码')
            else:
                error.append('原始密码输入不正确')
    else:
        form = ChangepwdForm()
    return render_to_response('customer/changepassword.html', {'form': form, 'error': error})


# endregion


@login_required
def usersetting(request):
    res = {'result': '1', 'msg': '修改成功'}
    try:
        this_post = request.POST
        user = User.objects.get(id=request.user.id)

        yijuhua = this_post.get('yijuhua', '')
        user.signature = yijuhua
        if 'name' in request.POST:
            name = this_post.get('name')
            user.realname = name
            sex = this_post.get('sex')
            user.sex = int(sex)

            birthyear = this_post.get('birthyear')
            birthmonth = this_post.get('birthmonth')
            birthday = this_post.get('birthday')
            if birthday and birthmonth and birthday:
                birth = datetime.date(int(birthyear), int(birthmonth), int(birthday))
                user.birthday = birth

            company = this_post.get('company')
            user.company = company
            position = this_post.get('position')
            user.position = position
            address = this_post.get('address')
            user.address = address
            weibo = this_post.get('weibo')
            user.weibo = weibo
            weixin = this_post.get('weixin')
            user.weixin = weixin

        user.save()
    except Exception, e:
        logging.error(e.message)
        res = {'msg': '修改失败'}
    finally:
        return JsonResponse(res)


class UserInfoBase(TemplateViewBase):
    def get_context_data(self, **kwargs):
        context = super(UserInfoBase, self).get_context_data(**kwargs)
        url_name = self.get_url_name()
        context['cl_' + url_name] = 'active'
        context['user'] = self.request.user
        return context


class UserAccountInfo(UserInfoBase):
    template_name = 'user_account_info.html'


class UserBaseInfo(UserInfoBase):
    template_name = 'user_base_info.html'


class UserBindInfo(UserInfoBase):
    template_name = 'user_bind_info.html'
