#!/usr/bin/env bash

source virtualenvwarpper.sh
workon yunjiu
nohup python manage.py runserver 0.0.0.0:80 &
