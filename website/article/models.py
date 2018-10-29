# coding=utf-8
from datetime import datetime

from DjangoUeditor.models import UEditorField
from active.models import Active
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models, connection
from setting.models import Category
from utils.models import BaseModel, YES_OR_NO


class Source(BaseModel):
    name = models.CharField('名称', max_length=200, unique=True)

    class Meta:
        db_table = 'source'
        verbose_name_plural = verbose_name = ' 来源'


class Tag(BaseModel):
    name = models.CharField('名称', max_length=32, unique=True)
    description = models.TextField('描述', null=True, blank=True)

    def articles_count(self):
        return self.t_articles.count()

    articles_count.short_description = '文章数量'

    class Meta:
        db_table = 'tag'
        verbose_name_plural = verbose_name = '标签'


class ArticleManager(models.Manager):
    # 参考： http://www.tuicool.com/articles/aiUBVrn
    def hot_articles(self):
        # 收藏3分 + 评论2分 + 点赞1分
        # select a.id, count(a.id) comment_count from article a left join article_comments c on a.id=c.article_id group by a.id order by comment_count desc;

        cursor = connection.cursor()  # todo 这里是不对滴
        sql = '''select a.id, count(a.id) comment_count from article a left join article_comments c
            on a.id=c.article_id group by a.id
            order by comment_count desc limit 10 offset 0;
            '''
        cursor.execute(sql)
        rows = cursor.fetchall()
        ids = [row[0] for row in rows]
        return self.filter(id__in=rows)

    def hot_tags(self):
        # select tag_id, count(tag_id) tag_count from article_tags group by tag_id order by tag_count desc;
        pass

    def paged_articles(self, page=1, page_size=5, category_id=0):
        offset = (page - 1) * page_size
        article_set = Article.objects.filter(status=2)
        if not category_id:
            article_set = article_set.filter(show_in_home=1).order_by('-top_in_home', '-top_in_home_time')
        else:
            article_set = article_set.filter(category_id=category_id).order_by('-publish_at')
        return article_set[offset: offset + page_size]


class Article(BaseModel):
    STATUS_SET = (
        (0, "草稿"),
        (1, "审核中"),
        (2, "审核通过"),
        (3, "未通过"),
        (4, "已删除"),
    )

    AUTH_WAY_SET = (
        (1, "微信原创标独家授权"),
        (2, "微信白名单授权 "),
    )

    title = models.CharField('标题', max_length=128, default="")
    mark = models.CharField('短标题', max_length=100, default="")
    description = models.TextField('描述', max_length=500, null=True, blank=True, default="")
    content = UEditorField(u'内容', width=730, height=500, toolbars="full",
                           upload_settings={"imageMaxSize": 1204000},  # 图片大小限制1M
                           settings={}, command=None, blank=True)

    cover = models.ImageField('封面', null=True, blank=True)
    publish_at = models.DateTimeField('发布时间', null=True, blank=True, default=datetime.now())
    category = models.ForeignKey(Category, related_name='c_articles',
                                 default=settings.DEFAULT.get('article_category_id'), verbose_name='栏目')
    short_story = models.IntegerField(choices=YES_OR_NO, default=0, verbose_name="早知道")
    status = models.IntegerField(choices=STATUS_SET, default=0, verbose_name='状态')

    source = models.ForeignKey(Source, verbose_name='来源', null=True, blank=True, default=1)
    creator = models.ForeignKey(User, related_name='u_articles', verbose_name='投稿人', null=True, blank=True)
    author = models.CharField('作者', max_length=100, null=True, blank=True, default='')
    editor = models.ForeignKey(User, related_name='u_editor_articles', verbose_name='编辑', null=True, blank=True)

    auth_way = models.IntegerField('微信授权', choices=AUTH_WAY_SET, default=1)
    auth_reprinted = models.IntegerField('原创标示', choices=YES_OR_NO, default=0)
    tag = models.IntegerField('匿名投稿', choices=YES_OR_NO, default=0)
    article_memo = models.IntegerField('联系方式', null=True, blank=True)

    tags = models.ManyToManyField(Tag, related_name='t_articles', verbose_name='标签列表', blank=True)
    keywords = models.CharField('关键词', max_length=1000, null=True, blank=True, default="")

    likes = models.ManyToManyField(User, related_name='u_articles_liked', verbose_name='点赞者列表', blank=True)

    show_in_home = models.IntegerField('显示到首页', choices=YES_OR_NO, default=0)
    top_in_home = models.IntegerField('首页置顶', choices=YES_OR_NO, default=0)
    top_in_home_time = models.DateTimeField('设置/取消置顶时间', null=True, blank=True)

    def display_author(self):
        return self.author or self.creator.display_name()

    def tag_list_display(self):
        return ', '.join(self.tags.select_related('name').values_list('name', flat=True))

    tag_list_display.short_description = '标签'

    def favorites_count(self):
        return self.a_favorites.all().count()

    favorites_count.short_description = '收藏数'

    def likes_count(self):
        return self.likes.select_related('name').count()

    likes_count.short_description = '点赞数'

    def comments_count(self):
        return self.a_comments.count()

    comments_count.short_description = '评论数'

    def root_comments(self):
        c = self.a_comments.filter(parent=None).all().order_by('-created_at')[
            0:settings.DEFAULT.get('comment_page_size')]
        return c

    def now_age(self):
        return '18小时'

    @property
    def cover_url(self):
        if self.cover and hasattr(self.cover, 'url'):
            return self.cover.url
        return '#'

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        # 当审核通过时，发布时间为空，那么发布时间设置为当前时间
        if self.status == 2 and self.publish_at is None:
            self.publish_at = datetime.now()

        super(Article, self).save()

    objects = ArticleManager()

    class Meta:
        db_table = 'article'
        verbose_name_plural = verbose_name = '文章'

    def __unicode__(self):
        return self.title


class CommentManager(models.Manager):
    def paged_comments(self, page=1, page_size=5, article_id=0):
        offset = (page - 1) * page_size
        comment_set = Comment.objects.order_by('-created_at')
        if article_id:
            comment_set = comment_set.filter(article_id=article_id)[offset: offset + page_size]
        else:
            comment_set = comment_set[offset: offset + page_size]
        return comment_set


class Comment(BaseModel):
    content = models.TextField('内容')
    creator = models.ForeignKey(User, related_name='u_comments', verbose_name='评论者')
    article = models.ForeignKey(Article, related_name='a_comments', verbose_name='文章')
    parent = models.ForeignKey('Comment', related_name='c_comments', null=True, blank=True)
    at = models.ForeignKey(User, related_name='at_comments', verbose_name='@了谁', null=True, blank=True)

    def children(self):
        return self.c_comments.all()

    objects = CommentManager()

    class Meta:
        db_table = 'article_comments'
        verbose_name_plural = verbose_name = '评论'

    def __unicode__(self):
        return self.content[0:50]


class FavoriteCategory(BaseModel):
    name = models.CharField('名称', max_length=255)
    creator = models.ForeignKey(User, related_name='u_favorite_categories', verbose_name='创建者')

    def favorites_count(self):
        return self.c_favorites.count()

    class Meta:
        db_table = 'favorite_category'
        verbose_name_plural = verbose_name = '收藏夹'


class Favorite(BaseModel):
    article = models.ForeignKey(Article, related_name='a_favorites', verbose_name='文章')
    category = models.ForeignKey(FavoriteCategory, related_name='c_favorites', verbose_name='所属收藏夹')
    creator = models.ForeignKey(User, related_name='u_favorites', verbose_name='收藏者')

    class Meta:
        db_table = 'favorite'
        verbose_name_plural = verbose_name = '收藏'
