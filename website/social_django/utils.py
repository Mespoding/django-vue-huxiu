# coding:utf-8

import warnings

from functools import wraps

from django.conf import settings
from django.core.urlresolvers import reverse
from django.http import Http404

from social_core.utils import setting_name, module_member, get_strategy
from social_core.exceptions import MissingBackend
from social_core.backends.utils import get_backend


BACKENDS = settings.AUTHENTICATION_BACKENDS
STRATEGY = getattr(settings, setting_name('STRATEGY'),
                   'social_django.strategy.DjangoStrategy')
STORAGE = getattr(settings, setting_name('STORAGE'),
                  'social_django.models.DjangoStorage')
Strategy = module_member(STRATEGY)
Storage = module_member(STORAGE)


def load_strategy(request=None):
    """
    实例化Strategy类
    :param request:
    :return:
    """
    return get_strategy(STRATEGY, STORAGE, request)


def load_backend(strategy, name, redirect_uri):
    Backend = get_backend(BACKENDS, name)
    return Backend(strategy, redirect_uri)


def psa(redirect_uri=None, load_strategy=load_strategy):
    """
    给request变量添加了两个属性：
    :param redirect_uri:
    :param load_strategy: strategy和backend
    :return:
    """
    def decorator(func):
        @wraps(func)
        def wrapper(request, backend, *args, **kwargs):
            uri = redirect_uri  # 点击联合登陆后，第三方的登录url定义，例如 social:complete
            if uri and not uri.startswith('/'):  # 非url的话，转换成url
                uri = reverse(redirect_uri, args=(backend,))
            request.social_strategy = load_strategy(request)  # 加载策略
            # backward compatibility in attribute name, only if not already
            # defined
            if not hasattr(request, 'strategy'):
                request.strategy = request.social_strategy

            try:
                request.backend = load_backend(request.social_strategy,
                                               backend, uri)
            except MissingBackend:
                raise Http404('Backend not found')
            return func(request, backend, *args, **kwargs)
        return wrapper
    return decorator


def setting(name, default=None):
    try:
        return getattr(settings, setting_name(name))
    except AttributeError:
        return getattr(settings, name, default)


class BackendWrapper(object):
    # XXX: Deprecated, restored to avoid session issues
    def authenticate(self, *args, **kwargs):
        return None

    def get_user(self, user_id):
        return Strategy(storage=Storage).get_user(user_id)
