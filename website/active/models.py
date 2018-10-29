# coding=utf-8
from django.contrib.auth.models import User
from django.db import models
from utils.models import BaseModel


class Active(BaseModel):
    STATUS_CHOICES = (
        (0, "未发布"),
        (1, "进行中"),
        (2, "已结束"),
    )

    title = models.CharField('标题', max_length=255, null=True, blank=True)
    mark = models.CharField('短标题', max_length=255, null=True, blank=True)
    description = models.CharField('描述', null=True, blank=True, max_length=255)
    cover = models.ImageField('封面', null=True, blank=True)
    backgroud = models.ImageField('背景图', null=True, blank=True)
    time_table = models.ImageField('时刻表', null=True, blank=True)

    guanggao_title = models.CharField('广告位标题', max_length=255, null=True, blank=True)
    guanggao_pic = models.ImageField('广告位图片', null=True, blank=True)
    guanggao_href = models.CharField('广告位链接', max_length=255, null=True, blank=True)
    status = models.IntegerField(choices=STATUS_CHOICES, verbose_name=' 状态', default=0)

    @property
    def cover_url(self):
        if self.cover and hasattr(self.cover, 'url'):
            return self.cover.url
        return '#'

    @property
    def backgroud_url(self):
        if self.backgroud and hasattr(self.backgroud, 'url'):
            return self.backgroud.url
        return '#'

    @property
    def time_table_url(self):
        if self.time_table and hasattr(self.time_table, 'url'):
            return self.time_table.url
        return '#'

    def __unicode__(self):
        return self.title

    class Meta:
        db_table = 'active'
        verbose_name_plural = verbose_name = '专题'


class ActiveFriendLink(BaseModel):
    title = models.CharField('标题', max_length=255)
    href = models.CharField('链接', max_length=300)
    cover = models.ImageField('图片', null=True, blank=True)
    active = models.ForeignKey(Active, verbose_name='所属专题', related_name='at_links', null=True, blank=True)

    class Meta:
        db_table = 'active_friend_link'
        verbose_name_plural = verbose_name = '专题-友情链接'

    def __unicode__(self):
        return self.title
