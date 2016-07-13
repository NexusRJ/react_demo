# coding: utf-8

from flask import Blueprint
from flask import render_template, redirect, url_for, flash, request
from models import Article

main = Blueprint('main', __name__)


@main.route('/')
def index():
    a = Article.query.all()
    return render_template('index.html', article_list=a)


@main.route('/fuck')
def fuck_main():
    return 'fuck'


@main.route('/read/<article_id>', methods=['GET'])
def read(article_id):
    # a = Article.query.filter_by(id=request.args.get('id')).first()
    a = Article.query.filter_by(id=article_id).first()
    if a:
        return render_template('article.html', article=a)
    else:
        return 'Opps.', 404


# @main.route('/read/<article_id>', method=['GET'])
