# coding=utf-8
from datetime import datetime
import time
from django.http import JsonResponse
from django.template.loader import get_template
from django.conf import settings
from article.models import Article
from utils.util_django import get_total_page


def article_list(request):
    the_post = request.POST
    page = int(the_post.get('page', 1))
    catid = the_post.get('catid')
    catid = int(catid) if catid else None
    last_dateline = datetime.fromtimestamp(int(the_post.get('last_dateline')))

    page_size = settings.DEFAULT.get('page_size')
    article_set = Article.objects.paged_articles(page=page, page_size=page_size, category_id=catid)
    if article_set.count():
        last_dateline = article_set.last().publish_at

    article_all = Article.objects.filter(status=2)
    total_count = article_all.count()
    total_page = get_total_page(page_size, total_count)

    last_dateline = time.mktime(last_dateline.timetuple())
    data = get_template("article_part.html").render(context={'article_list': article_set.all(), 'show_category': True})
    return JsonResponse({'result': 1,
                         'total_page': total_page,
                         'last_dateline': last_dateline,
                         'data': data})


