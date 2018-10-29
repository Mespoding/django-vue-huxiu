from django.template.defaultfilters import stringfilter
from django import template
from django.utils.safestring import mark_safe

register = template.Library()


@register.filter(is_safe=True)
@stringfilter
def short_string(value, arg):
    arg = int(arg)
    if value and 0 < arg < len(value):
        value = value[0:arg - 1] + '...'

    return value
