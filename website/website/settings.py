# coding=utf-8
import logging
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SECRET_KEY = 'z*#yeb0$qt0r!$q+^jzd2rs3#xiefty*gs!%2n2(=b!5)129kf'
DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = (
    # 'suit',  # http://django-suit.readthedocs.io/en/latest/configuration.html
    # 'xadmin',
    'grappelli',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',  # django扩展功能 http://django-extensions-zh.readthedocs.io/zh_CN/latest/command_extensions.html

    # 第三方应用
    # 'debug_toolbar',  # 调试工具
    'reversion',  # 为模型提供版本控制功能，稍微配置后，就可以恢复已经删除的模型或回滚到模型历史中的任何一点
    'rest_framework',  # 提供api  http://www.django-rest-framework.org/api-guide/
    'crispy_forms',
    'DjangoUeditor',
    'social_django',

    'utils',
    'restfulapi',  # 向外提供restfulapi服务
    'user',
    'user_action',
    'article',
    'member',
    'active',
    'setting',
)

SESSION_ENGINE = 'redis_sessions.session'
SESSION_REDIS_HOST = '127.0.0.1'
SESSION_REDIS_PORT = 6379
SESSION_REDIS_DB = 0
# SESSION_REDIS_PASSWORD = 'password'
# SESSION_REDIS_PREFIX = 'session'

CACHES = {
    'default': {
        'BACKEND': 'redis_cache.cache.RedisCache',
        'LOCATION': '127.0.0.1:6379',
        "OPTIONS": {
            "CLIENT_CLASS": "redis_cache.client.DefaultClient",
        },
    },
}
REDIS_TIMEOUT=7*24*60*60
CUBES_REDIS_TIMEOUT=60*60
NEVER_REDIS_TIMEOUT=365*24*60*60


MIDDLEWARE_CLASSES = (
    'website.middleware.BlockedIpMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'debug_toolbar.middleware.DebugToolbarMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'website.middleware.UserBasedExceptionMiddleware',
)

ROOT_URLCONF = 'website.urls'

WSGI_APPLICATION = 'website.wsgi.application'

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'yunjiu',
        'USER': 'debian-sys-maint',
        'PASSWORD': 'tpxCHJSjwDvmfcqp',
        'HOST': '101.201.154.172',  # 127.0.0.1
        'PORT': '3306',
    }
}
# GRANT ALL PRIVILEGES ON *.* TO 'debian-sys-maint'@'%' IDENTIFIED BY 'tpxCHJSjwDvmfcqp' WITH GRANT OPTION;

# region Settings for Internationalization
LANGUAGES_SUPPORTED = ('zh-cn',)
LANGUAGE_CODE = 'zh-Hans'
TIME_ZONE = 'Asia/Shanghai'
USE_I18N = True  # 国际化 -- Internationalization，i 和 n 之间有 18 个字母，简称 I18N
USE_L10N = True  # 本地化 -- localization， l 和 n 之间有 10 个字母，简称 L10N
USE_TZ = True
# endregion

# region Setting for (JS/CSS/IMAGE/TEMPLATE)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static_resources/').replace('\\', '/')  # 开发环境用不到，生产环境才用到
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media").replace('\\', '/')
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)

# endregion

# region Settings for log
logging.basicConfig(
    level=logging.INFO,
    format='%(filename)s[line:%(lineno)d] %(levelname)s (%(thread)d) (%(asctime)s) %(message)s',
    datefmt='%H:%M:%S',
    # filename='/var/log/yunjiu.log'
)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}

# endregion

# region Settings for email
# 用法： http://www.ziqiangxuetang.com/django/django-send-email.html
# http://wenku.baidu.com/link?url=yT4f-GS9uM7jvN-NNcpKPRqviKC6EApfnuimxGUJNkfe9ittMbEzle6KaD_Hf4QAyVYZrK7xOasUkb9YwDVgjAQwzOwzWITkTRW-YZs-UZ3
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = False
EMAIL_HOST = 'smtp.163.com.cn'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'yunjiu0919@163.com'
EMAIL_HOST_PASSWORD = 'yjtt2016'
DEFAULT_FROM_EMAIL = '云酒头条 <yunjiu0919@163.com>'
# endregion

# region Settings for sms
SMS = {
    'URL': 'http://sms.market.alicloudapi.com/singleSendSms',
    'TemplateCode': 'SMS_53530006',
    'SignName': '云酒头条',
    'APPCODE': '5684032d33284b4097eceec0c29eecac',
}
# endregion

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ('rest_framework.filters.DjangoFilterBackend',),
    'PAGINATE_BY': 10,
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 2
}

DEFAULT = {
    'article_category_id': 1,  # 思考派
    'avatar': 'avatar.png',  # 头像
    'page_size': 10,  # 每页文章数
    'comment_page_size': 10  # 评论数
}

# region Settings for qiniu
# 参考： http://django-qiniu-storage.readthedocs.io/zh_CN/latest/
DEFAULT_FILE_STORAGE = 'qiniustorage.backends.QiniuMediaStorage'
# STATICFILES_STORAGE = 'qiniustorage.backends.QiniuStaticStorage'  # 如果这里设置了，静态文件都会从七牛读，不从本地读，所以测试环境不要打开
QINIU_ACCESS_KEY = 'qLA9zbCyQFLjyKkKMNz8IDYu4JlIAdXsWpZoBiLq'  # 七牛给开发者分配的 AccessKey
QINIU_SECRET_KEY = 'HMTNd4AfDnOI6Y1hnalHrXWwzu_tA1Pc7EbZLc0J'  # 七牛给开发者分配的 Secret
QINIU_BUCKET_NAME = 'yunjiu'  # 用来存放文件的七牛空间(bucket)的名字
QINIU_BUCKET_DOMAIN = 'ojv4b1res.bkt.clouddn.com'  # 七牛空间(bucket)的域名
QINIU_SECURE_URL = '0'  # 是否通过 HTTPS 来访问七牛云存储上的资源(若为’是’, 可填True, true 或 1；若为’否’, 可填False, false 或 0)
# endregion

# region Settings for AuthLogin
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                "django.contrib.auth.context_processors.auth",
                'django.template.context_processors.request',
                'django.core.context_processors.request',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

from django.conf.global_settings import AUTHENTICATION_BACKENDS as AB

AUTHENTICATION_BACKENDS = AB + [
    'utils.backends.MobileBackend',
    'social_core.backends.weibo.WeiboOAuth2',
    'social_core.backends.weixin.WeixinOAuth2',
]
# https://open.weixin.qq.com/connect/qrconnect?scope=snsapi_login&state=kBN3nCeLE5wOpqE8haXWKpMls4GPlZTU&redirect_uri=http://www.yunjiuwang.com.cn:8100/complete/weixin/&response_type=code&appid=wx9719d921e921f2a9
# http://www.yunjiuwang.com.cn/complete/weixin/?state=kBN3nCeLE5wOpqE8haXWKpMls4GPlZTU&grant_type=authorization_code&code=xxxxxx
SOCIAL_AUTH_WEIXIN_KEY = 'wx9719d921e921f2a9'
SOCIAL_AUTH_WEIXIN_SECRET = 'cf09240d8d9f0ca069c7c56d2ad7bd41'
SOCIAL_AUTH_WEIXIN_SCOPE = ['snsapi_login']

SOCIAL_AUTH_WEIBO_KEY = 'wx9719d921e921f2a9'
SOCIAL_AUTH_WEIBO_SECRET = 'cf09240d8d9f0ca069c7c56d2ad7bd41'
SOCIAL_AUTH_WEIBO_SCOPE = ['snsapi_login']

LOGIN_REDIRECT_URL = '/'
SOCIAL_AUTH_NEW_USER_REDIRECT_URL = '/user/new_user_redirect_url/'
FIELDS_STORED_IN_SESSION = []  # 需要在session中存储request中传递的参数名称
# endregion


SUIT_CONFIG = {
    # header
    'ADMIN_NAME': '云酒后台管理系统',
    'LIST_PER_PAGE': 10,
    'MENU': (
        'sites',
        # {'app': 'article', 'label': u'文章管理', 'icon': 'icon-wrench'},
    ),
}

GRAPPELLI_ADMIN_TITLE = '云酒后台'

