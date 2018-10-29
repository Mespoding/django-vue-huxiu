
## 如何集成 ueditor 到 django 中

> 参考链接：http://www.cnblogs.com/fengzheng/p/3822266.html 
 
例子： http://www.codreamer.com:8100/static/ueditor/php/controller.php?action=config

1. 编辑器初始化时，异步请求后台处理页面，处理程序应该返回一套json格式的配置信息，请求地址携带的参数为action=config
2. 点击图片上传按钮，异步请求后台处理页面，请求地址携带参数为action=uploadimage
3. 点击视频上传按钮，异步请求后台处理页面，请求地址携带参数为action=uploadvideo
4. 点击附件上传按钮，异步请求后台处理页面，请求地址携带参数为action=uploadfile
5. 点击多图上传中的在线图片选项卡，异步请求后台处理页面，请求地址携带参数为action=listimage
6. 点击附件上传的在线文件选项卡，异步请求后台处理页面，请求地址携带参数为action=listfile
7. 点击涂鸦按钮后，异步请求后台处理页面，请求地址携带参数为action=uploadscrawl

每次请求的不同参数值，调用不同的方法进行处理，如下图所示，controller根据参数值，调用对应的处理程序进行处理：

![处理逻辑](http://images.cnitblog.com/blog/273364/201407/031444371051300.png)

## 如何把 ueditor 上传的图片传到七牛？

## 如何在更改 django 的 ImageField 的默认行为，使得上传的图片直接到七牛？

## vue 的使用技巧

## 如何自定义登录逻辑，如手机号+短信验证登录？

自定义一个身份验证的backend，加到settings中的 AUTHENTICATION_BACKENDS 列表中。示例如下：
```
from django.contrib.auth import get_user_model
from django.contrib.auth import backends


class MobileBackend(backends.ModelBackend):
    """
    Authenticates against settings.AUTH_USER_MODEL.
    """

    def authenticate(self, phone=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(phone=phone)
            return user
        except UserModel.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a non-existing user (#20760).
            # UserModel().set_password(password)
            pass
```

## social_django 如何使用？

## 