# coding=utf-8

from django.db import models

SORT_SET = (
    (0, ""),
    (10, "第一位"),
    (9, "第二位"),
    (8, "第三位"),
    (7, "第四位"),
    (6, "第五位"),
    (5, "第六位"),
    (4, "第七位"),
    (3, "第八位"),
    (2, "第九位"),
    (1, "第十位"),
)

YES_OR_NO = (
    (0, "否"),
    (1, "是"),
)


class BaseModel(models.Model):
    created_at = models.DateTimeField('创建时间', auto_now_add=True)
    updated_at = models.DateTimeField('最后修改时间', auto_now=True)

    class Meta:
        abstract = True

    def __unicode__(self):
        return getattr(self, 'name', '')

    @property
    def cover_url(self):
        if self.cover and hasattr(self.cover, 'url'):
            return self.cover.url
        return '#'
