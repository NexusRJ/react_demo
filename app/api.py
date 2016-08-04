# coding: utf-8

import json

from flask import Blueprint, Response

from models import Article, Category

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
