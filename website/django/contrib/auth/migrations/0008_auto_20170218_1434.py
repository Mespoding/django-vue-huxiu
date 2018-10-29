# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-02-18 14:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0007_alter_validators_add_error_messages'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='address',
            field=models.CharField(blank=True, max_length=255, verbose_name=b'\xe5\xb1\x85\xe4\xbd\x8f\xe5\x9c\xb0\xe5\x9d\x80'),
        ),
        migrations.AddField(
            model_name='user',
            name='alipay',
            field=models.CharField(blank=True, max_length=255, verbose_name=b'alipay'),
        ),
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default=b'avatar.png', upload_to=b'', verbose_name=b'\xe5\xa4\xb4\xe5\x83\x8f'),
        ),
        migrations.AddField(
            model_name='user',
            name='birthday',
            field=models.DateField(blank=True, null=True, verbose_name=b'\xe7\x94\x9f\xe6\x97\xa5'),
        ),
        migrations.AddField(
            model_name='user',
            name='company',
            field=models.CharField(blank=True, max_length=255, verbose_name=b'\xe6\x89\x80\xe5\x9c\xa8\xe5\x85\xac\xe5\x8f\xb8'),
        ),
        migrations.AddField(
            model_name='user',
            name='country',
            field=models.CharField(blank=True, default=b'+86', max_length=26, verbose_name=b'\xe6\x89\x8b\xe6\x9c\xba\xe5\x8f\xb7\xe7\xa0\x81\xe5\x89\x8d\xe7\xbc\x80'),
        ),
        migrations.AddField(
            model_name='user',
            name='nickname',
            field=models.CharField(blank=True, max_length=255, verbose_name=b'\xe6\x98\xb5\xe7\xa7\xb0'),
        ),
        migrations.AddField(
            model_name='user',
            name='phone',
            field=models.CharField(blank=True, max_length=26, verbose_name=b'\xe6\x89\x8b\xe6\x9c\xba\xe5\x8f\xb7\xe7\xa0\x81'),
        ),
        migrations.AddField(
            model_name='user',
            name='position',
            field=models.CharField(blank=True, max_length=255, verbose_name=b'\xe8\x81\x8c\xe4\xbd\x8d'),
        ),
        migrations.AddField(
            model_name='user',
            name='qq',
            field=models.CharField(blank=True, max_length=255, verbose_name=b'QQ'),
        ),
        migrations.AddField(
            model_name='user',
            name='realname',
            field=models.CharField(blank=True, max_length=255, verbose_name=b'\xe7\x9c\x9f\xe5\xae\x9e\xe5\xa7\x93\xe5\x90\x8d'),
        ),
        migrations.AddField(
            model_name='user',
            name='sex',
            field=models.IntegerField(choices=[(0, b'\xe4\xbf\x9d\xe5\xaf\x86'), (1, b'\xe7\x94\xb7'), (2, b'\xe5\xa5\xb3')], default=0, verbose_name=b'\xe6\x80\xa7\xe5\x88\xab'),
        ),
        migrations.AddField(
            model_name='user',
            name='signature',
            field=models.CharField(blank=True, max_length=255, verbose_name=b'\xe4\xb8\xaa\xe6\x80\xa7\xe7\xad\xbe\xe5\x90\x8d'),
        ),
        migrations.AddField(
            model_name='user',
            name='sina',
            field=models.CharField(blank=True, max_length=255, verbose_name=b'\xe5\xbe\xae\xe5\x8d\x9a'),
        ),
        migrations.AddField(
            model_name='user',
            name='wechat',
            field=models.CharField(blank=True, max_length=255, verbose_name=b'\xe5\xbe\xae\xe4\xbf\xa1'),
        ),
    ]
