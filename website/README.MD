## 安装依赖包
```
mkvirtualenv yunjiu
pip install -r requirements.txt
```

## 同步数据库

CREATE DATABASE yunjiu DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; 
在项目中添加了新的model,执行如下命令,在数据库中即可生成对应的表
```
python manage.py makemigrations
python manage.py migrate
```

## 运行方式
```
python manage.py runserver 0.0.0.0:8100
# 后台运行方式: 
nohup python manage.py runserver 0.0.0.0:80 &
```

## demo 地址

用户名：admin 密码：password
* 后台管理系统 http://121.42.58.246:8100/admin   
* api管理页面: http://121.42.58.246:8100/api/books/  

## grappli 的配置
https://django-grappelli.readthedocs.io/en/latest/customization.html
pip install django-grappelli==2.8.3

# 云酒

## 老网站
* 前台: [http://www.yunjiuwang.com.cn](http://www.yunjiuwang.com.cn)
* 后台：[http://www.yunjiuwang.com.cn/wp-login.php](http://www.yunjiuwang.com.cn/wp-login.php)
* 用户名：yjw 密码:123qwe
* 邮箱和密码: yunjiu0919@163.com yjtt2016

## 新网站
* 前台：
* mysql 数据库：yunjiu Yunjiu_123
* ip: 101.201.154.172(公) / 10.45.149.182(内) Yunjiu-123
*

## 第三方网站
* [微博开发平台](http://open.weibo.com/)
* [七牛云存储服务](https://developer.qiniu.io/kodo)


* [阿里短信服务](https://yq.aliyun.com/articles/59928?spm=5176.730006-cmapi011900.102.10.6D8ioI)
```
账号: yunjiutoutiao
密码: Yjtt-2016
```

* [微信开发平台](https://open.weixin.qq.com/) yunjiu0919@163.com Yjtt2016
```
www.yunjiuwang.com.cn/complete/weixin/
AppID: wx9719d921e921f2a9
AppSecret: cf09240d8d9f0ca069c7c56d2ad7bd41
```

* 新浪配置参数
```

```

## 部署方式
docker 部署

[基于nginx和uWSGI在Ubuntu上部署Django](http://www.jianshu.com/p/e6ff4a28ab5a)

## django 第三方包
* [DjangoUeditor](https://github.com/zhangfisher/DjangoUeditor) 百度Ueditor与Django的结合
* [django-qiniu-storage]() 七牛云存储服务与Django的结合
* [django-social-auth](https://github.com/omab/django-social-auth)  第三方联合登陆与Django的结合


## 参考地址
* [django的用户权限管理](http://blog.csdn.net/onlyanyz/article/details/46805547)
* Django-guardian
* https://github.com/yueyoum/duckadmin
* [微信联合登录](https://segmentfault.com/a/1190000008701211?utm_source=tuicool&utm_medium=referral) 
# [第三方联合登录](https://my.oschina.net/duoduo3369/blog/300858)

