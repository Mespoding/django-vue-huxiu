# coding=utf-8
from datetime import datetime

from django import template
register = template.Library()


def date_select(date_val):
    if date_val:
        if isinstance(date_val, basestring):
            date_val = datetime.strptime(date_val, 'YYYY-MM-DD')
        return {'date': date_val}

register.inclusion_tag('date_select.html')(date_select)
