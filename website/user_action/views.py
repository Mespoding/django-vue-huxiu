# coding=utf-8
# Create your views here.
import logging
import uuid

import requests
from django.contrib import auth
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.db.models import Q
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.shortcuts import render_to_response
from django.template.loader import get_template
from qiniustorage.backends import QiniuMediaStorage

from setting.models import FeedBack
from social_django.models import UserSocialAuth
from user.views import login_validate
from utils.util_qiniu import SyMediaStorage
from utils.util_web import TemplateViewBase, create_verify_code, send_verify_code


def resetCaptcha(request):
    this_post = request.POST
    huxiu_hash_code = this_post.get('huxiu_hash_code')
    username = this_post.get('username')  # 手机号
    captcha = send_verify_code(username)
    if captcha:
        request.session['sms_captcha'] = captcha
        return JsonResponse({'success': 1, 'data': {'message': '短信发送成功'}})
    return JsonResponse({'success': 0, 'error': {'message': '短信发送失败'}})


def loginSms(request):
    this_post = request.POST
    username = this_post.get('username')  # 手机号
    country = this_post.get('country')  # 前缀：+86
    captcha = this_post.get('captcha')  # 验证码
    if request.session.get('sms_captcha', '') != captcha:
        return JsonResponse({'success': 0, 'error': {'message': '验证码不正确'}})

    res = False
    try:  # 此手机号对应的用户存在时，直接登录；不存在的话，创建新用户并登录
        User.objects.get(phone=username)
        res = login_validate(request, phone=username)
    except Exception, e:
        logging.info(e)
        password = uuid.uuid1()
        user = User.objects.create_user(username='yunjiu_%s' % username,
                                        password=password,
                                        phone=username
                                        )
        res = login_validate(request, username=user.username, password=password)

    if res:
        return JsonResponse({'success': 1, 'msg': '登录成功'})
    return JsonResponse({'success': 0, 'error': {'message': '登录失败'}})


def loginUsername(request, **kwargs):
    this_post = request.POST
    huxiu_hash_code = this_post.get('huxiu_hash_code')

    username = this_post.get('username')  # 用户名/邮箱/手机号
    password = this_post.get('password')
    autologin = this_post.get('autologin')
    country = this_post.get('country')

    users = User.objects.filter(Q(username=username) | Q(email=username) | Q(phone=username))
    if users.count() == 0:
        return JsonResponse({'success': 0, 'error': {'message': '账号不存在'}})

    user = users[0]
    res = login_validate(request, user.username, password)
    if res:
        return JsonResponse({'success': 1, 'msg': '登录成功'})
    return JsonResponse({'success': 0, 'error': {'message': '账号或密码不正确'}})


def forgot_pwd(request):
    return HttpResponse('xxxx')


def updateEmail(request):
    this_post = request.POST
    huxiu_hash_code = this_post.get('huxiu_hash_code')
    username = this_post.get('username')  # email
    password = this_post.get('password')
    captcha = this_post.get('captcha')

    if request.session.get('email_captcha') != captcha:
        return JsonResponse({'success': 0, 'error': {'message': '验证码不正确'}})

    if not request.user.check_password(password):
        return JsonResponse({'success': 0, 'error': {'message': '密码不正确'}})

    user = User.objects.get(id=request.user.id)
    user.email = username
    user.save()

    return JsonResponse({'success': 1, 'data': {'message': '邮箱修改成功'}})

def updateMobile(request):
    this_post = request.POST
    huxiu_hash_code = this_post.get('huxiu_hash_code')
    username = this_post.get('username')  # phone
    password = this_post.get('password')
    captcha = this_post.get('captcha')

    if request.session.get('sms_captcha') != captcha:
        return JsonResponse({'success': 0, 'error': {'message': '验证码不正确'}})

    if not request.user.check_password(password):
        return JsonResponse({'success': 0, 'error': {'message': '密码不正确'}})

    user = User.objects.get(id=request.user.id)
    user.phone = username
    user.save()

    return JsonResponse({'success': 1, 'data': {'message': '手机号修改成功'}})

def mobileCaptcha(request):
    username = request.POST.get('username')  # phone
    password = request.POST.get('password')
    if not request.user.check_password(password):
        return JsonResponse({'success': 0, 'error': {'message': '密码不正确'}})

    captcha = send_verify_code(username)
    if captcha:
        request.session['sms_captcha'] = captcha
        return JsonResponse({'success': 1, 'data': {'message': '短信发送成功'}})
    return JsonResponse({'success': 0, 'error': {'message': '短信发送失败'}})


# 根据用户id，发送一份邮件
def emailCaptcha(request):
    username = request.POST.get('username')  # email
    password = request.POST.get('password')
    if not request.user.check_password(password):
        return JsonResponse({'success': 0, 'error': {'message': '密码不正确'}})

    captcha = create_verify_code()
    request.session['email_captcha'] = captcha

    try:
        res = send_mail('邮箱验证', '您的验证码为：%s. 请及时进行验证' % captcha, settings.EMAIL_HOST_USER,
                        [username], fail_silently=False)
    except Exception, e:
        logging.error(e)
        return JsonResponse({'success': 0, 'error': {'message': '发送失败'}})

    return JsonResponse({'success': 1, 'data': {'message': '发送成功'}})


def feedback(request):
    this_post = request.POST
    fd = FeedBack()
    try:
        content = this_post.get('content')
        contact = this_post.get('contact')
        fd.contact = contact
        fd.content = content
        if request.user.is_authenticated():
            creator = request.user
            fd.creator = creator
        fd.save()
        return JsonResponse({'success': 1, 'msg': '反馈成功'})
    except:
        return JsonResponse({'success': 0, 'msg': '反馈失败'})


def change_avatar(request):
    __avatar1 = request.FILES.get('__avatar1')  # 200*200
    __avatar2 = request.FILES.get('__avatar2')  # 150*150
    __avatar3 = request.FILES.get('__avatar3')  # 40*40

    storage = QiniuMediaStorage()
    name = storage.save(__avatar1.name, __avatar1.file)

    user = User.objects.get(id=request.user.id)
    user.avatar = name
    user.save()

    avatar_url = storage.url(name)
    return JsonResponse({'type': 0, 'content': {'sourceUrl': avatar_url, 'avatarUrls': avatar_url}})


def setPassword(request):
    this_post = request.POST
    password = this_post.get('password')
    user = User.objects.get(id=request.user.id)
    user.set_password(password)
    user.save()
    return JsonResponse({'success': 1, 'data': {'message': '密码修改成功'}})


def updateUsername(request):
    this_post = request.POST
    username = this_post.get('username')
    captcha = this_post.get('captcha')
    password = this_post.get('password')
    user = User.objects.get(id=request.user.id)
    user.nickname = username
    user.save()
    return JsonResponse({'success': 1, 'data': {'message': '用户名修改成功'}})


def auth_login(request, login_type):
    # todo 在settings中配置相关参数
    callback_url = 'http://www.yunjiuwang.com.cn/user_action/oauthCallback/%s' % login_type
    urls = {
        'qq': 'https://graph.qq.com/oauth/show?which=Login&display=pc&response_type=code&client_id=%s&redirect_uri=%s',
        'sina': 'https://api.weibo.com/oauth2/authorize?client_id=%s&response_type=code&redirect_uri=%s',
        'alipay': 'https://auth.alipay.com/login/index.htm?goto=https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=%s&scope=auth_user&redirect_uri=%s'
    }
    redirect_url = urls.get(login_type)
    return HttpResponseRedirect(redirect_url)


def oauthCallback(request, login_type):
    # todo 根据第三方传递过来的值，检查数据库中是否有此用户，有的话直接登录，没有的话创建新用户并登录
    # qq/sina/alipay/weixin
    if login_type == 'weixin':
        # 参考： https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316518&lang=zh_CN
        code = request.GET.get('code')
        state = request.GET.get('state')

        # / sns / oauth2 / access_token
        # / sns / auth
        # / sns / oauth2 / refresh_token
        # / sns / userinfo

        # 第一步：根据 code+appid+appsecrect 获取访问用户信息的access_token
        access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + "" + "&secret=" + "" + "&code=" + code + "&grant_type=authorization_code"
        res = requests.get(access_token_url)
        json_res = res.json()

        # 正确的返回值
        # {
        #     "access_token": "ACCESS_TOKEN",  # 访问用户的临时证书
        #     "expires_in": 7200,
        #     "refresh_token": "REFRESH_TOKEN",  # 当access_token超时后，可以使用refresh_token进行刷新，此标示有三十天有效期
        #     "openid": "OPENID",  # 用户唯一标示，存数据库
        #     "scope": "SCOPE",
        #     "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
        # }
        # 错误的返回值  {"errcode":40029,"errmsg":"invalid code"}

        # 第二步: 根据openid在查询用户在数据库中是否存在
        # 2.1 存在: 获取用户信息并登陆

        # 2.2 不存在: 创建新用户并与此openid关联

        # 第三步: 根据 access_token 获取用户头像、名称等信息，更新到用户信息表中；
        # /sns/auth
        # /oauth2/refresh_token
        # https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID
        refresh_url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=" + "" + "&grant_type=refresh_token&refresh_token=" + ""

        # user_info = {
        #     "openid": "OPENID",
        #     "nickname": "NICKNAME",
        #     "sex": 1,
        #     "province": "PROVINCE",
        #     "city": "CITY",
        #     "country": "COUNTRY",
        #     "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
        #     "privilege": [
        #         "PRIVILEGE1",
        #         "PRIVILEGE2"
        #     ],
        #     "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL"
        # }

        # 正确的返回值： 同步骤一
        # 错误的返回值： {"errcode": 40030, "errmsg": "invalid refresh_token"}

    elif login_type == 'sina':
        pass
    else:
        pass

    return JsonResponse({'xxx': 'yyy'})


# 登录
def login_html(request):
    return JsonResponse({'success': 1, 'data': get_template('login.html').render()})


def country_list(request):
    return render_to_response('country_list.html')


def register_oauth(request):
    return render_to_response('')


def registerOauth(request):
    try:
        this_post = request.POST
        username = this_post.get('username')
        bid = this_post.get('bid')
        user = User.objects.get(id=bid)
        setattr(user, "nickname", username)

        social_user = UserSocialAuth.objects.get(user_id=bid)
        setattr(user, "wechat_avatar", social_user.extra_data.get("profile_image_url"))

        user.save()
        return JsonResponse({'success': 1, 'data': {'message': '修改成功'}})
    except:
        return JsonResponse({'success': 0, 'error': {'message': '修改成功'}})


def bind(request):
    this_post = request.POST
    bid = this_post.get('bid')
    username = this_post.get('username')
    password = this_post.get('password')
    captcha = this_post.get('captcha')
    country = this_post.get('country')

    return JsonResponse({'success': 1, 'data': {'message': '密码修改成功'}})


def weibo_related(request):
    this_post = request.POST
    huxiu_hash_code = this_post.get('huxiu_hash_code')
    aid = this_post.get('aid')
    type = this_post.get('type')
    url = this_post.get('url')

    return JsonResponse({'success': 1, 'data': {'message': '密码修改成功'}})


class ResetPassword(TemplateViewBase):
    template_name = 'reset_password.html'

    def post(self, request):
        this_post = request.POST
        username = this_post.get('username')  # 手机号
        country = this_post.get('country')
        password = this_post.get('password')
        password2 = this_post.get('password2')
        captcha = this_post.get('captcha')

        if self.request.session.get('sms_captcha') != captcha:
            return JsonResponse({'error': {'message': '验证码不正确'}})

        if not password or not password2:
            return JsonResponse({'error': {'message': '密码不能为空'}})

        if password != password2:
            return JsonResponse({'error': {'message': '密码输入不一致'}})

        users = User.objects.filter(Q(username=username) | Q(email=username) | Q(phone=username))
        if users.count() == 0:
            return JsonResponse({'error': {'message': '手机号/邮箱/云酒账号不存在'}})

        user = users[0]
        user.set_password(password2)
        user.save()
        return JsonResponse({'success': 1, 'data': {'message': '密码修改成功'}})
