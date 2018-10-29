# coding: utf-8
from __future__ import unicode_literals, absolute_import

from rest_framework import permissions, viewsets, filters

from article.models import Category, Article
from .serializers import CategorySerializer, ArticleSerializer

# 参考：　https://blog.laisky.com/p/django-rest/

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        pass

    def destroy(self, request, *args, **kwargs):
        pass

    def list(self, request, *args, **kwargs):
        return super(CategoryViewSet, self).list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        pass

    def partial_update(self, request, *args, **kwargs):
        pass

    def update(self, request, *args, **kwargs):
        pass

    permission_classes = (permissions.IsAuthenticated,)


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    filter_fields = ('title', 'description', 'content')
    filter_backends = (filters.OrderingFilter, filters.SearchFilter,)
    ordering_fields = ('title', 'created_at')  # http://example.com/api/users?ordering=title,-created_at
    search_fields = ('title', 'description')  # http://example.com/api/users?search=title

    # def filter_queryset(self, request, queryset, view):
    #     nodename = request.QUERY_PARAMS.get('title')
    #     if nodename:
    #         return queryset.filter(nodename=nodename)
    #     else:
    #         return queryset

    # @detail_route(renderer_classes=[renderers.StaticHTMLRenderer])
    # def plaintext(self, request, *args, **kwargs):
    #     """自定义 Api 方法"""
    #     model = self.get_object()
    #     return Response(repr(model))