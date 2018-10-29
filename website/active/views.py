# coding=utf-8
from django.http import Http404
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from article.models import Active, Category
from utils.util_web import TemplateViewBase


def pics(request):
    active_id = request.GET.get("active_id")
    category = Category.objects.get(active_id=active_id, key="tuji")
    data = {"imageData": []}
    for artice in category.c_articles.all():
        data["imageData"].append([
            artice.title, artice.cover_url, "/article/details/%s" % artice.id
        ])
    return JsonResponse(data)


class ActiveView(TemplateViewBase):
    template_name = "active_details.html"

    def get_context_data(self, active_id, **kwargs):
        context = super(ActiveView, self).get_context_data(**kwargs)
        try:
            active_id = int(active_id)
        except:
            raise Http404

        active = get_object_or_404(Active, id=active_id)
        context['active'] = active
        categories = Category.objects.filter(active_id=active_id)
        for category in categories:
            context[category.key] = {
                "category_id": category.id,
                "objects": category.c_articles.filter(status=2).order_by('-created_at')[0:category.show_num]
            }
        return context


class ActiveListView(TemplateViewBase):
    template_name = 'active_list.html'

    def get_context_data(self, **kwargs):
        context = super(ActiveListView, self).get_context_data(**kwargs)
        actives = Active.objects.exclude(status=0)
        context['actives'] = actives
        return context
