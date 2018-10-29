# coding=utf-8
import os

from django import template
from django.conf import settings

register = template.Library()

from article.models import Tag, Article, Category


def navbar():
    categories = Category.objects.filter(status=1).order_by('-top_no')
    return {'categories': categories}


def story_center(title='早知道', num=10):
    stories = Article.objects.filter(status=2, short_story=1).order_by('-created_at')[0:num]
    return {'stories': stories, 'title': title}


def hot_tags(title='热门标签', num=10):
    tags = Tag.objects.all().order_by('-created_at')[0:num]
    return {'tags': tags, 'title': title}


def hot_articles(title='热门', num=10):
    # 收藏3分 + 评论2分 + 点赞1分
    articles = Article.objects.filter(status=2).order_by('-created_at')[0:num]
    return {'articles': articles, 'title': title}


register.inclusion_tag('story_center.html')(story_center)
register.inclusion_tag('navbar.html')(navbar)
register.inclusion_tag('hot_tags.html')(hot_tags)
register.inclusion_tag('hot_articles.html')(hot_articles)

register.inclusion_tag('m_story_center.html', name="m_story_center")(story_center)
register.inclusion_tag('m_navbar.html', name="m_navbar")(navbar)
register.inclusion_tag('m_hot_tags.html', name="m_hot_tags")(hot_tags)
register.inclusion_tag('m_hot_articles.html', name="m_hot_articles")(hot_articles)