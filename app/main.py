# coding: utf-8

from flask import Blueprint
from flask import render_template, redirect, url_for, flash, request
from models import Article, Category

main = Blueprint('main', __name__)


@main.route('/')
def index():
    article_list = Article.query.all()
    return render_template('index.html', article_list=article_list)


@main.route('/fuck')
def fuck_main():
    return 'fuck'


@main.route('/read/<article_id>', methods=['GET'])
def read(article_id):
    # a = Article.query.filter_by(id=request.args.get('id')).first()
    article = Article.query.filter_by(id=article_id).first()
    if article:
        return render_template('article.html', article=article)
    else:
        return 'Opps.', 404


@main.route('/categorys', methods=['GET'])
def categorys():
    categories = Category.query.all()
    return render_template('category_list.html', categories=categories)


@main.route('/category/<category_id>', methods=['GET'])
def category(category_id):
    category = Category.query.filter_by(id=category_id).first()
    article_list = category.articles
    return render_template('category.html', articles=article_list)
