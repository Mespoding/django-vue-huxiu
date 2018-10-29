# coding: utf-8
from __future__ import unicode_literals, absolute_import

import json

from rest_framework import serializers

from article.models import Article
from article.models import Category, Article


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'c_articles')


class ArticleSerializer(serializers.ModelSerializer):
    # category = CategorySerializer()

    class Meta:
        model = Article
        fields = ('id', 'title', 'cover', 'description', 'category', 'publish_at', 'creator', 'tags', 'favorites')