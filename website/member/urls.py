# coding:utf-8
import functools

from django.conf.urls import url, patterns
from django.views.generic import TemplateView
from django.views.generic import View

from utils.util_web import isme_required
from views import *

urlpatterns = patterns(
    "",

    url(r"^get_message_count/", get_message_count, name="get_message_count"),
    url(r"^send_private_msg/", send_private_msg, name="send_private_msg"),
    url(r"^readmsg/(?P<user_id>\d+)/(?P<msg_id>\d+)/", readmsg, name="readmsg"),

    # 收藏夹分类
    url(r"^add_favorite/", add_favorite, name="add_favorite"),
    url(r"^delete_favorite/", delete_favorite, name="delete_favorite"),
    url(r"^add_favorite_category/", add_favorite_category, name="add_favorite_category"),
    url(r"^delete_favorite_category/", delete_favorite_category, name="delete_favorite_category"),
    url(r"^update_favorite_category/", update_favorite_category, name="update_favorite_category"),
    url(r"^get_favorite_category_all_list/", get_favorite_category_all_list, name="get_favorite_category_all_list"),
    url(r"^favorite_category_agree/", MessageView.as_view(), name="favorite_category_agree"),

    # 这里有个分支，当前用户的话，这里看到的是"我的消息"(message)，其它用户看到的"ta的文章"(article)
    url(r"^(?P<user_id>\d+)?/$", user_index, name="index"),

    # 我的消息
    url(r"^(?P<user_id>\d+)/message/", isme_required(MessageView.as_view()), name="message"),
    url(r"^(?P<user_id>\d+)/systemnotice/", isme_required(SystemNoticeView.as_view()), name="systemnotice"),
    url(r"^(?P<user_id>\d+)/privatemsg/", isme_required(PrivateMsgView.as_view()), name="privatemsg"),

    # 我/ta的文章
    url(r"^(?P<user_id>\d+)/article/", PublicedArticleView.as_view(), name="article"),
    url(r"^(?P<user_id>\d+)/verify_article/", isme_required(VerifyArticleView.as_view()), name="verify_article"),
    url(r"^(?P<user_id>\d+)/killed_article/", isme_required(KilledArticleView.as_view()), name="killed_article"),
    url(r"^(?P<user_id>\d+)/draft_article/", isme_required(DraftArticleView.as_view()), name="draft_article"),

    # 我/ta的评论
    url(r"^(?P<user_id>\d+)/post/", PostView.as_view(), name="post"),
    url(r"^(?P<user_id>\d+)/postcomment/", PostCommentView.as_view(), name="postcomment"),

    # 我/ta的收藏
    url(r"^(?P<user_id>\d+)/favorite/", FavoriteView.as_view(), name="favorite"),
    url(r"^add_favorite/", MessageView.as_view(), name="add_favorite"),
    url(r"^delete_favorite/", MessageView.as_view(), name="delete_favorite"),

    # 我/ta的关注
    url(r"^(?P<user_id>\d+)/favorite_topic/", FavoriteTopicView.as_view(), name="favorite_topic"),

    # 我/ta的订单
    url(r"^(?P<user_id>\d+)/order/", isme_required(OrderView.as_view()), name="order"),
)

