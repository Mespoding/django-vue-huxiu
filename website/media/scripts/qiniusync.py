#!/usr/bin/env python
# -*- coding:utf-8 -*-
# 
# AUTHOR = "heqingpan"
# AUTHOR_EMAIL = "heqingpan@126.com"
# URL = "http://git.oschina.net/hqp/qiniu_sync"

import qiniu
from qiniu import Auth
from qiniu import BucketManager
import os
import re
import urllib2
import sys

access_key = 'qLA9zbCyQFLjyKkKMNz8IDYu4JlIAdXsWpZoBiLq'
secret_key = 'HMTNd4AfDnOI6Y1hnalHrXWwzu_tA1Pc7EbZLc0J'
bucket_name = 'yunjiu'
bucket_domain = 'ojv4b1res.bkt.clouddn.com'

q = Auth(access_key, secret_key)
bucket = BucketManager(q)
basedir = os.path.realpath(os.path.dirname(__file__))
# 同步目录
# basedir=""
filename = __file__
ignore_paths = [filename, "{0}c".format(filename)]
ignore_names = [".DS_Store", ".git", ".gitignore"]
charset = "utf8"
diff_time = 2 * 60


def list_all(bucket_name, bucket=None, prefix="", limit=100):
    rlist = []
    if bucket is None:
        bucket = BucketManager(q)
    marker = None
    eof = False
    while eof is False:
        ret, eof, info = bucket.list(bucket_name, prefix=prefix, marker=marker, limit=limit)
        marker = ret.get('marker', None)
        for item in ret['items']:
            rlist.append(item["key"])
    if eof is not True:
        # 错误处理
        # print "error"
        pass
    return rlist


def down_file(key, basedir="", is_private=1, expires=3600):
    if isinstance(key, unicode):
        key = key.encode(charset)
    url = 'http://%s/%s' % (bucket_domain, key)
    if is_private:
        url = q.private_download_url(url, expires=expires)
    c = urllib2.urlopen(url)
    fpath = key.replace("/", os.sep)
    savepath = os.path.join(basedir, fpath)
    dir_ = os.path.dirname(savepath)
    if not os.path.isdir(dir_):
        os.makedirs(dir_)
    elif os.path.isfile(savepath):
        os.remove(savepath)
    f = file(savepath, 'wb')
    f.write(c.read())
    f.close()


def down_all(prefix=""):
    import traceback
    for key in list_all(bucket_name, bucket, prefix=prefix):
        try:
            down_file(key, basedir=basedir)
            print "down:\t" + key
        except:
            print "error down:\t" + key
            print traceback.format_exc()
    print "down end"


def main():
    if len(sys.argv) > 1:
        if sys.argv[1] == "down":
            prefix = len(sys.argv) > 2 and sys.argv[2] or ""
            down_all(prefix=prefix)
            return


if __name__ == "__main__":
    main()
