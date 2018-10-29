# coding=utf-8
import os

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.db.models import Q
from django.conf import settings
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.template import Template
from django.template.loader import get_template
from django.views.generic import DetailView
from django.views.generic import ListView

from article.models import Article, Tag, Category, Comment
from utils.util_django import get_total_page
from utils.util_qiniu import SyMediaStorage
from utils.util_web import TemplateViewBase, ApplyMobileMiXIN


class ArticleListView(TemplateViewBase, ApplyMobileMiXIN):
    template_name = 'article_list.html'

    def get_context_data(self, category_id, **kwargs):
        context = super(ArticleListView, self).get_context_data(**kwargs)
        category = Category.objects.get(id=category_id)
        context['category'] = category
        article_set = Article.objects.filter(status=2, category_id=category_id).order_by('-publish_at')
        context['article_list'] = article_set.all()
        return context


class ArticleDetailsView(TemplateViewBase, ApplyMobileMiXIN):
    template_name = 'article_details.html'
    model = Article

    def get_context_data(self, **kwargs):
        context = super(ArticleDetailsView, self).get_context_data(**kwargs)
        pk = kwargs.get('pk')
        article = Article.objects.get(id=pk)
        context['article'] = article
        context['aid'] = pk
        users = article.likes.filter(id=self.request.user.id)
        context['i_like'] = users.count() > 0
        return context


class TagListView(TemplateViewBase):
    template_name = 'tag_list.html'

    def get_context_data(self, tag_id, **kwargs):
        context = super(TagListView, self).get_context_data(**kwargs)
        tag = Tag.objects.get(id=int(tag_id))
        context['tag'] = tag
        context['article_list'] = tag.t_articles.all()
        return context


class TotalTags(TemplateViewBase):
    template_name = 'total_tags.html'


class ContributeView(TemplateViewBase):
    template_name = 'contribute.html'

    def get_context_data(self, **kwargs):
        context = super(ContributeView, self).get_context_data(**kwargs)
        aid = self.request.GET.get('aid') or 0  # 文章
        did = self.request.GET.get('did') or 0  # 草稿
        context['aid'] = aid
        context['did'] = did
        pk = aid or did
        if pk:
            article = Article.objects.get(id=pk)
            context['article'] = article
        return context


class SearchView(TemplateViewBase):
    template_name = 'search.html'

    def get_context_data(self, **kwargs):
        context = super(SearchView, self).get_context_data(**kwargs)
        s = self.request.GET.get('s')
        context['s'] = s
        if s:
            article_list = Article.objects.filter(Q(title__contains=s) | Q(title__contains=s))
            context['article_list'] = article_list

            related_user = article_list.values_list('id', 'creator')
            context['related_user'] = related_user
        return context


def like_article(request):
    if request.method == 'POST':
        aid = int(request.POST.get('aid'))  # 正数表示点赞, 负数表示取消点赞
        try:
            likes = Article.objects.get(id=abs(aid)).likes
            if aid > 0:
                likes.add(request.user)
            else:
                likes.remove(request.user)
            return JsonResponse({'result': 1})
        except:
            return JsonResponse({'msg': '点赞失败'})


def comment_list(request):
    if request.method == 'POST':
        page = int(request.POST.get('page'))
        aid = int(request.POST.get('aid'))

        # page += 1
        page_size = settings.DEFAULT.get('comment_page_size')
        comments = Comment.objects.paged_comments(page, page_size, aid)

        total_count = Comment.objects.filter(article_id=aid).count()
        total_page = get_total_page(page_size, total_count)

        data = ''
        if comments.count() > 0:
            data = get_template('comment_list.html').render({'comments': comments, 'user': request.user})

        return JsonResponse({'result': 1, 'msg': '获取成功', 'cur_page': page, 'total_page': total_page, 'data': data})


def add_comment(request):
    if request.method == 'POST':
        huxiu_hash_code = request.POST.get('huxiu_hash_code')
        random = request.POST.get('random')

        aid = request.POST.get('aid')
        message = request.POST.get('message')
        comment = Comment.objects.create(article_id=aid, creator_id=request.user.id, content=message)
        return JsonResponse({'result': 1, 'message': message, 'pid': comment.id})


def deldata(request):
    if request.method == 'POST':
        huxiu_hash_code = request.POST.get('huxiu_hash_code')
        random = request.POST.get('random')
        # param.actype = oParent.attr("type"), // article
        # param.aid = oParent.attr("aid"), // 下面这些id只有一个
        # param.pid = oParent.attr("pid"),
        # param.cid = oParent.attr("cid"),
        # param.haid = oParent.attr("haid"),
        # param.favid = oParent.attr("favid"),
        # param.uid = oParent.attr("uid"),
        # param.tag_id = oParent.attr("tagid"),
        # param.plid = oParent.attr("plid"),
        # param.pmid = oParent.attr("pmid"),
        # param.did = oParent.attr("did"),

        this_post = request.POST
        actype = this_post.get('actype')
        aid = this_post.get('aid')
        pid = this_post.get('pid')
        cid = this_post.get('cid')
        haid = this_post.get('haid')
        favid = this_post.get('favid')
        uid = this_post.get('uid')
        tag_id = this_post.get('tag_id')
        plid = this_post.get('plid')
        pmid = this_post.get('pmid')
        did = this_post.get('did')  # 这个用不上，是删除草稿时用的

        # todo 这里应该检查资源是否是用户自己的
        try:
            if actype == 'article' and aid:
                article = Article.objects.get(id=aid)
                article.status = 0  # 把文章删除到草稿箱
                article.save()
                msg = '文章被删除到了草稿箱'
            elif actype == 'comment' and pid:
                Comment.objects.get(id=pid).delete()
                msg = '评论已删除'
            elif actype == 'recomment' and cid:
                Comment.objects.get(id=cid).delete()
                msg = '点评已删除'
            else:
                return JsonResponse({'msg': '参数不正确'})
            return JsonResponse({'result': 1, 'msg': msg})
        except:
            return JsonResponse({'msg': '删除失败'})


def del_draft(request):
    if request.method == 'POST':
        huxiu_hash_code = request.POST.get('huxiu_hash_code')
        random = request.POST.get('random')
        did = request.POST.get('did')

        articles = Article.objects.filter(creator_id=request.user.id, id=did)
        if articles.count() == 0:
            return JsonResponse({'error': '您只能删除自己的草稿'})

        article = articles[0]
        article.delete()
        return JsonResponse({'result': 1, 'msg': '草稿删除成功'})


def recomment(request):
    if request.method == 'POST':
        this_post = request.POST
        aid = this_post.get('aid')  # 文章id
        pid = this_post.get('pid')  # 评论id
        at_name = this_post.get('at_name')  # @的人名
        message = this_post.get('message')

        co = Comment()
        users = User.objects.filter(Q(nickname=at_name) | Q(username=at_name))
        if users:
            co.at_id = users[0].id
            at_href = reverse('member:index', args=(co.at_id,))
            message = '<span class="author-content">回复 <a href="{0}" target="_blank">@{1}</a> ：{2}</span>'.format(
                at_href, at_name, message)

        co.article_id = aid
        co.parent_id = pid
        co.content = this_post.get('message')
        co.creator_id = request.user.id
        co.save()

        return JsonResponse({'result': 1, 'reppid': co.id, 'message': message})


def comment_recommend(request):
    if request.method == 'POST':
        # todo
        aid = request.POST.get('aid')  # '0' 表示没有点赞
        s = Article.objects.get(id=1).likes.add(request.user)
        return JsonResponse({'result': 1})


def share(request):
    url = 'http://www.yunjiuwang.con.cn/action/share?huxiu_hash_code=9fb83ea7d640b1cf2769daff4a649182&aid=3&pid=undefined&des=hxs_tsina&f=pc-weibo-article&fid=undefined&topic_id=undefined'
    return HttpResponseRedirect(url)


def img_upload(request):
    if request.method == 'POST':
        huxiu_hash_code = request.POST.get('huxiu_hash_code')

        img = request.FILES.get('img')
        storage = SyMediaStorage()
        url = storage.save(img.name, img.file)

        return JsonResponse({'result': 1, 'url': url})


def article_save(request):
    if request.method == 'POST':
        did = request.POST.get('did')  # 草稿，尚未成为文章

        title = request.POST.get('title')
        content = request.POST.get('content')
        if did == '0':  # 情况一： 新的草稿
            article = Article()
        else:  # 情况二： 修改历史草稿
            article = Article.objects.get(id=did)

        article.title = title
        article.content = content
        article.creator = request.user
        article.category_id = settings.DEFAULT['article_category_id']
        article.save()

        return JsonResponse({'result': 1, 'msg': '保存草稿成功'})


def article_submit(request):
    if request.method == 'POST':
        aid = request.POST.get('aid', '0')
        did = request.POST.get('did', '0')
        title = request.POST.get('title')
        content = request.POST.get('content')
        auth_way = request.POST.get('auth_way')  # 微信原创标独家授权 1/2
        auth_reprinted = request.POST.get('auth_reprinted')  # 原创标识 1/0
        tag = request.POST.get('tag')  # 匿名投稿 1/0
        article_memo = request.POST.get('article_memo')  # 联系方式

        if did == '0' and aid == '0':  # 情况一： 新的文章提交
            article = Article()
        elif did != '0' and aid == '0':  # 情况二: 历史草稿提交
            article = Article.objects.get(id=did)
        else:  # 情况三：已提交的文章再次提交
            article = Article.objects.get(id=aid)

        article.title = title
        article.content = content
        article.creator = request.user
        article.category_id = settings.DEFAULT['article_category_id']
        article.status = 1
        # article.auth_way = auth_way
        # article.auth_reprinted = auth_reprinted
        # article.tag = tag
        # article.article_memo = article_memo

        article.save()

        return JsonResponse({'result': 1, 'msg': '已提交，稿件审核中'})
