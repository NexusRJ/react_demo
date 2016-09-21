# coding: utf-8

import json

from flask import Blueprint, Response, request

from models import Article, Category, Comment
from app import db

api = Blueprint('api', __name__)


def generate_json_response(data='', status=200, message='Success', **kwargs):
    response_data = {}
    response_data['data'] = data
    response_data['message'] = message
    response_data.update(kwargs)
    return Response(
        response=json.dumps(response_data),
        status=status,
        mimetype='application/json',
        headers={
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        }
    )


@api.route('/article/<article_id>/', methods=['GET'])
def article(article_id):
    article = Article.query.get(article_id)
    if article:
        return generate_json_response(article.to_dict())
    else:
        return generate_json_response(status=404, message="Article doesn't exist")


@api.route('/articles/', methods=['GET'])
def articles():
    article_list = []
    if articles:
        for article in Article.query.all():
            article_list.append(
                article.to_dict()
            )
        return generate_json_response(article_list)
    else:
        return generate_json_response(status=404, message="No articles at all")


@api.route('/category/<category_id>/', methods=['GET'])
def category(category_id):
    category = Category.query.get(category_id)
    if category:
        article_list = []
        for article in category.articles:
            article_list.append(
                article.to_dict()
            )
        data = {
            'category_name': category.name,
            'articles': article_list,
            'id': category.id
        }
        return generate_json_response(data)
    else:
        return generate_json_response(status=404, message="Category doesn't exist")


@api.route('/categories/', methods=['GET'])
def categories():
    categories = Category.query.all()
    if categories:
        category_list = []
        for category in categories:
            category_list.append(
                category.to_dict()
            )
        return generate_json_response(category_list)
    else:
        return generate_json_response(status=404, message="No categories")


@api.route('/comments/<article_id>/', methods=['GET', 'POST'])
def comments(article_id):
    if request.method == 'GET':
        from datetime import datetime
        l = [{'comment_id': 1, 'content': 'test comments 1', 'create_time': str(datetime.now().date())},
             {'comment_id': 2, 'content': 'test comments 2', 'create_time': str(datetime.now().date())},
             {'comment_id': 3, 'content': 'test comments 3', 'create_time': str(datetime.now().date())}]
        return generate_json_response(l)
    elif request.method == 'POST':
        data = json.loads(request.json)
        content = data.get('content')
        user_id = data.get('user', None)
        article = Article.query.filter_by(id=int(article_id)).first()
        if content and article:
            comment = Comment(content=content, user_id=user_id, article_id=int(article_id))
            db.session.add(comment)
            return generate_json_response(status=201, message='Comment created successily')
        else:
            return generate_json_response(status=404, message='Wrong comment content or article not exists')
    else:
        return generate_json_response(status=400, message='Wrong request')
