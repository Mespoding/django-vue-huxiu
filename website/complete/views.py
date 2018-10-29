# Create your views here.
from django.http import JsonResponse


def weibo(request):
    return JsonResponse({'x': 1})
    pass