"""
AOL OpenId backend, docs at:
    http://psa.matiasaguirre.net/docs/backends/aol.html
"""
from .open_id import OpenIdAuth


class AOLOpenId(OpenIdAuth):
    name = 'aol'
    URL = 'http://openid.aol.com'
