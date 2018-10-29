# coding=utf-8
# Create your views here.
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.http import HttpResponsePermanentRedirect
from django.http import JsonResponse
from setting.models import Message
from article.models import FavoriteCategory, Favorite
from utils.util_web import TemplateViewBase, ListViewBase
from django.core.paginator import InvalidPage, Paginator


class MemberViewBase(TemplateViewBase):
    user = None

    def paged_object_list(self, context, queryset):
        paginator = Paginator(queryset, self.per_page)
        page_no = self.request.GET.get('page') or 1
        page = paginator.page(page_no)
        context.update({
            'paginator': paginator,
            'page_obj': page,
            'is_paginated': True,
            'object_list': page.object_list
        })

    def get_context_data(self, **kwargs):
        context = super(MemberViewBase, self).get_context_data(**kwargs)
        user_id = kwargs.get('user_id')
        is_me = self.request.user.id == int(user_id)
        self.user = User.objects.get(id=user_id)
        url_name = self.get_url_name()
        mark = getattr(self, 'mark')

        context['user'] = self.user
        context['is_me'] = is_me
        context['dis_me'] = 'display: block;' if is_me else 'display: none;'
        context['dis_her'] = 'display: none;' if is_me else 'display: block;'
        context['cl_' + url_name] = 'active'
        context['cl_' + mark] = 'active'

        return context


def user_index(request, user_id):
    if request.user.id == int(user_id):
        return HttpResponsePermanentRedirect(reverse('member:message', args=(user_id,)))
    else:
        return HttpResponsePermanentRedirect(reverse('member:article', args=(user_id,)))


# region 我的消息
class MessageBaseView(MemberViewBase):
    mark = 'message_base'


class MessageView(MessageBaseView):
    template_name = 'message/message.html'

    def get_context_data(self, **kwargs):
        context = super(MessageView, self).get_context_data(**kwargs)
        self.paged_object_list(context, self.user.at_comments.all())
        return context


class SystemNoticeView(MessageBaseView):
    template_name = 'message/systemnotice.html'

    def get_context_data(self, **kwargs):
        context = super(SystemNoticeView, self).get_context_data(**kwargs)
        return context


class PrivateMsgView(MessageBaseView):
    template_name = 'message/privatemsg.html'

    def get_context_data(self, **kwargs):
        context = super(PrivateMsgView, self).get_context_data(**kwargs)
        if context['is_me']:
            qs = self.user.u_send_msgs.filter(type=0)
        else:
            qs = self.user.u_receive_msgs.filter(type=0)

        self.paged_object_list(context, qs)
        return context


# endregion


# region 我/ta的文章
class ArticleBaseView(MemberViewBase):
    mark = 'article_base'

    def get_context_data(self, **kwargs):
        context = super(ArticleBaseView, self).get_context_data(**kwargs)
        self.articles_set = self.user.u_articles.all()
        self.verify_set = self.articles_set.filter(status=1)
        self.draft_set = self.articles_set.filter(status=0)
        self.killed_set = self.articles_set.filter(status=3)
        self.published_set = self.articles_set.filter(status=2)
        context['draft_count'] = self.draft_set.count()
        context['verfify_count'] = self.verify_set.count()
        context['published_count'] = self.published_set.count()
        context['killed_count'] = self.killed_set.count()
        return context

    # 如果传递过来的不是当前登录用户的id，则加载template_name1
    def get_template_names(self):
        if self.request.user.id == self.user.id:
            return getattr(self, 'template_name')
        else:
            return getattr(self, 'template_name1')


class PublicedArticleView(ArticleBaseView):
    template_name = 'article/publiced_article.html'
    template_name1 = 'article/publiced_article1.html'

    def get_context_data(self, **kwargs):
        context = super(PublicedArticleView, self).get_context_data(**kwargs)
        self.paged_object_list(context, self.published_set)
        return context

class KilledArticleView(ArticleBaseView):
    template_name = 'article/killed_article.html'

    def get_context_data(self, **kwargs):
        context = super(KilledArticleView, self).get_context_data(**kwargs)
        qs = self.killed_set
        self.paged_object_list(context, qs)
        return context


class DraftArticleView(ArticleBaseView):
    template_name = 'article/draft_article.html'

    def get_context_data(self, **kwargs):
        context = super(DraftArticleView, self).get_context_data(**kwargs)
        qs = self.draft_set
        self.paged_object_list(context, qs)
        return context


class VerifyArticleView(ArticleBaseView):
    template_name = 'article/verify_article.html'

    def get_context_data(self, **kwargs):
        context = super(VerifyArticleView, self).get_context_data(**kwargs)
        qs = self.verify_set
        self.paged_object_list(context, qs)
        return context


# endregion


# region 我/ta的评论
class PostBaseView(MemberViewBase):
    mark = 'post_base'

    def get_context_data(self, **kwargs):
        context = super(PostBaseView, self).get_context_data(**kwargs)
        self.comments_set = self.user.u_comments.filter(parent_id__isnull=True)
        self.postcomments_set = self.user.u_comments.filter(parent_id__isnull=False)
        context['comments_count'] = self.comments_set.count()
        context['postcomments_count'] = self.postcomments_set.count()
        return context


class PostView(PostBaseView):
    template_name = 'post/post.html'
    template_name1 = 'post/post1.html'

    def get_context_data(self, **kwargs):
        context = super(PostView, self).get_context_data(**kwargs)
        qs = self.comments_set
        self.paged_object_list(context, qs)
        return context


class PostCommentView(PostBaseView):
    template_name = 'post/postcomment.html'

    def get_context_data(self, **kwargs):
        context = super(PostCommentView, self).get_context_data(**kwargs)
        qs = self.postcomments_set
        self.paged_object_list(context, qs)
        return context


# endregion


# 我/ta的收藏
class FavoriteView(MemberViewBase):
    mark = 'favorite_base'
    template_name = 'favorite.html'
    template_name1 = 'favorite1.html'

    def get_context_data(self, **kwargs):
        context = super(FavoriteView, self).get_context_data(**kwargs)
        qs = self.user.u_favorite_categories.all()
        self.paged_object_list(context, qs)
        return context


# 我/ta的关注
class FavoriteTopicView(MemberViewBase):
    mark = 'favorite_topic_base'
    template_name = 'favorite_topic.html'
    template_name1 = 'favorite_topic1.html'

    def get_context_data(self, **kwargs):
        context = super(FavoriteTopicView, self).get_context_data(**kwargs)
        return context


# 我的订单
class OrderView(MemberViewBase):
    mark = 'order_base'
    template_name = 'order.html'

    def get_context_data(self, **kwargs):
        context = super(OrderView, self).get_context_data(**kwargs)
        return context


def get_message_count(request):  # todo 获取用户消息
    data = {'comment_message_num': 0, 'system_message_num': 0, 'private_message_num': 0}
    return JsonResponse({'result': 1, 'data': data})


def get_favorite_category_all_list(request):
    cats = FavoriteCategory.objects.filter(creator_id=request.user.id)
    data = []
    for cat in cats:
        data.append(dict(
            cid=cat.id,
            name=cat.name,
            count=cat.c_favorites.count()
        ))
    return JsonResponse({'result': 1, 'data': data})


def add_favorite_category(request):
    if request.method == 'POST':
        huxiu_hash_code = request.POST.get('huxiu_hash_code')
        name = request.POST.get('name')
        cats = FavoriteCategory.objects.filter(name=name)
        if cats.count() > 0:
            return JsonResponse({'msg': '此收藏夹已存在'})

        obj = FavoriteCategory.objects.create(name=name, creator=request.user)
        return JsonResponse({'result': '1', 'cid': obj.id})


def add_favorite(request):
    huxiu_hash_code = request.POST.get('huxiu_hash_code')
    aid = request.POST.get('aid')
    cid = request.POST.get('cid')  # 可能有多个收藏夹,例如1,2,3
    res = {'result': '1', 'msg': '添加成功'}

    cids = cid.split(',')
    for cid in cids:
        fav_ids = Favorite.objects.filter(article_id=aid, category_id=cid, creator_id=request.user.id).values('id')
        if fav_ids.count() > 0:
            res = {'result': '0', 'msg': '您已经收藏过了'}
            continue
        Favorite.objects.create(article_id=aid, category_id=cid, creator_id=request.user.id)

    return JsonResponse(res)


def delete_favorite(request):
    huxiu_hash_code = request.POST.get('huxiu_hash_code')
    aid = request.POST.get('aid')
    cid = request.POST.get('cid')

    res = {'result': '0', 'msg': '删除失败'}
    try:
        Favorite.objects.get(article_id=aid, category_id=cid).delete()
        res = {'result': '1', 'msg': '收藏已删除'}
    except:
        pass
    finally:
        return JsonResponse(res)


def delete_favorite_category(request):
    huxiu_hash_code = request.POST.get('huxiu_hash_code')
    cid = request.POST.get('cid')

    res = {'result': '0', 'msg': '删除失败'}
    try:
        FavoriteCategory.objects.get(id=cid).delete()
        res = {'result': '1', 'msg': '收藏夹已删除'}
    except:
        pass
    finally:
        return JsonResponse(res)


def update_favorite_category(request):
    huxiu_hash_code = request.POST.get('huxiu_hash_code')
    cid = request.POST.get('cid')
    name = request.POST.get('name')

    res = {'result': '0', 'msg': '更改失败'}
    try:
        fav = FavoriteCategory.objects.get(id=cid)
        fav.name = name
        fav.save()
        res = {'result': '1', 'msg': '更改成功'}
    except:
        pass
    finally:
        return JsonResponse(res)


def send_private_msg(request):
    res = {'result': 0, 'msg': '发送失败'}
    the_post = request.POST
    try:
        content = the_post.get('message')
        touid = the_post.get('touid')

        message = Message()
        message.type = 0
        message.content = content
        message.creator_id = request.user.id
        message.receiver_id = touid
        message.save()
        res = {'result': 1, 'msg': '发送成功'}
    except:
        pass
    finally:
        return JsonResponse(res)



def readmsg(request, user_id, msg_id):
    the_post = request.POST

    pass
