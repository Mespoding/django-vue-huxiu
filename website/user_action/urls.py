#coding:utf-8
from django.conf.urls import url,patterns
from django.views.generic import TemplateView
from views import *

urlpatterns=patterns(
    "",

    # 第三方验证
    url(r"^auth_login/(?P<login_type>.+)/", auth_login, name="auth_login"),
    url(r"^oauthCallback/(?P<login_type>.+)/", oauthCallback, name="oauthCallback"),  # 回调函数
    url(r"^register_oauth/", register_oauth, name="register_oauth"),  # 回调函数跳到此页面，提示用户更改用户名后登陆，或者绑定原有账号
    url(r"^registerOauth/", registerOauth, name="registerOauth"),  # 第三方账号登陆，更改用户名

    url(r"^bind/", bind, name="bind"),
    url(r"^weibo_related/", bind, name="weibo_related"),

    url(r"^feedback/", feedback, name="feedback"),  # 反馈
    url(r"^countryList/", country_list, name="countryList"),  # 返回国家手机前缀列表
    url(r"^loginHtml/", login_html, name="loginHtml"),  # 返回登录的html页面
    url(r"^login/", loginUsername, name="login"),  # 普通登录
    url(r"^loginSms/", loginSms, name="loginSms"),  # 极速注册和短信验证登录共用此方法

    # 验证码
    url(r"^emailCaptcha/", emailCaptcha, name="emailCaptcha"),  # 发送验证邮件
    url(r"^resetCaptcha/", resetCaptcha, name="resetCaptcha"),  # 获取短信验证码
    url(r"^mobileCaptcha/", mobileCaptcha, name="mobileCaptcha"),  # 获取短信验证码: 需要密码验证
    url(r"^bindCaptcha/", forgot_pwd, name="bindCaptcha"),

    # 修改操作
    url(r"^updateUsername/", updateUsername, name="updateUsername"),
    url(r"^updatePassword/", forgot_pwd, name="updatePassword"),
    url(r"^resetPassword/", ResetPassword.as_view(), name="resetPassword"),  # 忘记密码
    url(r"^setPassword/", setPassword, name="setPassword"),  # 修改密码
    url(r"^updateEmail/", updateEmail, name="updateEmail"),  # 更改邮箱
    url(r"^updateMobile/", updateMobile, name="updateMobile"),  # 更改手机号
    url(r"^change_avatar/", change_avatar, name="change_avatar"),  # 更改头像
)


