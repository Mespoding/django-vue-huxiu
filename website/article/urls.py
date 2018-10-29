#coding:utf-8
from django.conf.urls import url,patterns
from django.views.generic import TemplateView
from views import *


urlpatterns=patterns(
    "",
    url(r"^list/(?P<category_id>.*)/", ArticleListView.as_view(), name="list"),
    url(r"^details/(?P<pk>.*)/", ArticleDetailsView.as_view(), name="details"),
    url(r"^relatedArticle/", ContributeView.as_view(), name="relatedArticle"),
    url(r"^total_tags/", TotalTags.as_view(), name="total_tags"),
    url(r"^tag_list/(?P<tag_id>.*)/", TagListView.as_view(), name="tag_list"),
    url(r"^search/", SearchView.as_view(), name="search"),

    url(r"^like/", like_article, name="like"),
    url(r"^share/", share, name="share"),

    url(r"^del_draft/", del_draft, name="del_draft"),  # 删除文章或评论
    url(r"^deldata/", deldata, name="deldata"),  # 删除文章或评论
    url(r"^comment_list/", comment_list, name="comment_list"),
    url(r"^add_comment/", add_comment, name="add_comment"),
    url(r"^recomment/", recomment, name="recomment"),
    url(r"^comment_recommend/", comment_recommend, name="comment_recommend"),

    # 投稿
    url(r"^contribute/", ContributeView.as_view(), name="contribute"),  # 打开投稿页面
    url(r"^save/", article_save, name="save"),  # 保存草稿
    url(r"^submit/", article_submit, name="submit"),  # 直接提交
    url(r"^img_upload/", img_upload, name="img_upload"),  # 图片上传
)