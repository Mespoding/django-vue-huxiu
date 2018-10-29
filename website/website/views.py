import logging

from django.views.generic import TemplateView
from setting.models import UserDefined, FriendLink, Companion
from article.models import Article, Category
from user.views import login_validate
from utils.util_web import TemplateViewBase, ApplyMobileMiXIN
from django.conf import settings


class IndexView(TemplateViewBase):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        page_size = settings.DEFAULT.get('page_size')
        article_set = Article.objects.paged_articles(page_size=page_size)

        a_count = article_set.count()
        context['first'] = article_set[0] if a_count > 0 else None
        context['second'] = article_set[1] if a_count > 1 else None
        context['third'] = article_set[2] if a_count > 2 else None
        context['article_list'] = article_set[3:settings.DEFAULT.get('page_size')] if a_count > 3 else []
        context['show_category'] = True

        return context


class AboutUsBaseView(TemplateViewBase):
    def get_context_data(self, **kwargs):
        context = super(AboutUsBaseView, self).get_context_data(**kwargs)
        url_name = self.get_url_name()
        context['cl_' + url_name] = 'active'
        user_defined = UserDefined.objects.filter(type=self.about_us_type, status=1)
        if user_defined.count() > 0:
            context['object'] = user_defined[0]
        return context


class AboutUsView(AboutUsBaseView):
    template_name = "about/about_us.html"
    about_us_type = 0


class JoinUsView(AboutUsBaseView):
    template_name = "about/join_us.html"
    about_us_type = 1


class PartnersView(AboutUsBaseView):
    template_name = "about/partners.html"
    about_us_type = 2


class FriendLinksView(AboutUsBaseView):
    template_name = "about/friend_links.html"
    about_us_type = 2

    def get_context_data(self, **kwargs):
        context = super(FriendLinksView, self).get_context_data(**kwargs)
        context['friend_links'] = FriendLink.objects.all()
        context['companions'] = Companion.objects.all()
        return context


class AdServiceView(AboutUsBaseView):
    template_name = "about/ad_service.html"
    about_us_type = 4


class QuestionsView(AboutUsBaseView):
    template_name = "about/questions.html"
    about_us_type = 5
