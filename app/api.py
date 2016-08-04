# coding: utf-8

import json

from flask import Blueprint, Response

from models import Article, Category

api = Blueprint('api', __name__)


def generate_json_response(data_dict={}, status=200, message='Success'):
    data_dict['message'] = message
    return Response(
        response=json.dumps(data_dict),
        status=status,
        memetype='application/json',
        headers={
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        }
    )


@api.route('/article/<article_id>', methods=['GET'])
def article(article_id):
    article = Article.query.get_or_404(article_id)
    if article:
        return generate_json_response(article.to_dict())
    else:
        return generate_json_response(status=404, message="Article doesn't exist")
