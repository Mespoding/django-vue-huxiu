# coding=utf-8

from django.db import models

from DjangoUeditor.models import UEditorField
from active.models import Active
from utils.models import SORT_SET, YES_OR_NO
from utils.models import BaseModel
from django.contrib.auth.models import User

CATEGORY_SET = (
    (0, "专题栏目"),
    (1, "普通栏目"),
)


class FeedBack(BaseModel):
    content = models.TextField('内容')
    creator = models.ForeignKey(User, related_name='u_feedbacks', verbose_name='创建者', blank=True, null=True)
    contact = models.CharField('联系方式', max_length=255, default='')

    class Meta:
        db_table = 'feedback'
        verbose_name_plural = verbose_name = '用户反馈'


class Message(BaseModel):
    MessageType = (
        (0, "私信"),
        (1, "系统信息"),
    )

    content = models.TextField('内容')
    creator = models.ForeignKey(User, related_name='u_send_msgs', verbose_name='发送者')
    receiver = models.ForeignKey(User, related_name='u_receive_msgs', verbose_name='接受者')
    type = models.IntegerField(choices=MessageType, verbose_name='信息类型')

    class Meta:
        db_table = 'message'
        verbose_name_plural = verbose_name = '信息'


class UserDefined(BaseModel):
    AboutUsChoices = (
        (0, "关于我们"),
        (1, "加入我们"),
        (2, "合作伙伴"),
        (3, "友情链接"),
        (4, "广告及服务"),
        (5, "常见问题解答"),
        (6, "metas"),
    )
    type = models.IntegerField(choices=AboutUsChoices, verbose_name='类型')
    content = UEditorField(u'富文本内容', width=600, height=300, toolbars="full",
                           upload_settings={"imageMaxSize": 1204000},  # 图片大小限制1M
                           settings={}, command=None, blank=True)
    content1 = models.TextField(u'简单文本', null=True, blank=True)
    status = models.IntegerField('是否发布', choices=YES_OR_NO, default=1)

    class Meta:
        db_table = 'user_defined'
        verbose_name_plural = verbose_name = '自定义显示'


class Category(BaseModel):
    name = models.CharField('名称', max_length=32)
    key = models.CharField('标识', max_length=32, null=True, blank=True)
    description = models.TextField('描述', null=True, blank=True)
    status = models.IntegerField('普通栏目/专题栏目', choices=CATEGORY_SET, default=1)
    active = models.ForeignKey(Active, verbose_name='所属专题', related_name='at_categories', null=True, blank=True)
    show_num = models.IntegerField('显示数量(专题栏目限制数量用)', default=5)
    top_no = models.IntegerField('先后顺序', choices=SORT_SET, default=0)

    def articles_count(self):
        return self.c_articles.count()

    articles_count.short_description = '文章数量'

    class Meta:
        db_table = 'category'
        verbose_name_plural = verbose_name = '栏目'


class Companion(BaseModel):
    title = models.CharField('标题', max_length=255)
    href = models.CharField('链接', max_length=300)
    cover = models.ImageField('图片', null=True, blank=True)

    class Meta:
        db_table = 'companion'
        verbose_name_plural = verbose_name = '合作伙伴'

    def __unicode__(self):
        return self.title


class FriendLink(BaseModel):
    title = models.CharField('标题', max_length=255)
    href = models.CharField('链接', max_length=300)

    class Meta:
        db_table = 'friend_link'
        verbose_name_plural = verbose_name = '友情链接'

    def __unicode__(self):
        return self.title

