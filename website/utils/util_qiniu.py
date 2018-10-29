# coding=utf-8
import os

from qiniustorage.backends import QiniuStorage


class SyStorage(QiniuStorage):
    # location = ''

    # def url(self, name):
    #     r_url = os.path.join(self.bucket_domain, os.path.join(self.location, name))
    #
    #     return r_url

    def save(self, name, content, max_length=None):
        if name and not isinstance(name, unicode):
            name = unicode(name, 'utf-8')
        named = super(SyStorage, self).save(name, content, max_length)  # 重名的元素七牛会自动改名
        return self.url(named)


class SyMediaStorage(SyStorage):
    location = 'media'


class SyStaticStorage(SyStorage):
    location = 'static'
