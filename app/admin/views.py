# coding: utf-8

from __future__ import unicode_literals

from flask import render_template, flash, redirect, url_for, request
from flask_login import login_required, current_user, login_user, logout_user

from forms import LoginForm, RegistrationForm, PostArticleForm, PostCategoryForm
from app.models import User, Article, Category
from app import db
from . import admin


@admin.route('/')
def index():
    return render_template('admin/index.html')


@admin.route('/login/', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user)
            return redirect(request.args.get('next') or url_for('admin.index'))
        flash(u'用户密码不正确')
    return render_template('admin/login.html', form=form)


@admin.route('/register/', methods=['GET', 'POST'])
def register():
    register_key = 'zhucema'
    form = RegistrationForm()
    if form.validate_on_submit():
        if form.registerkey.data != register_key:
            flash(u'注册码错误，傻逼')
            return redirect(url_for('admin_register'))
        else:
            if form.password.data != form.password2.data:
                flash(u'两次密码不一样')
                return redirect(url_for('admin.register'))
            else:
                user = User(username=form.username.data, password=form.password.data, real_name=form.real_name.data)
                db.session.add(user)
                flash(u'注册好了')
                return redirect(url_for('admin.login'))
    return render_template('admin/register.html', form=form)


@admin.route('/logout/')
@login_required
def logout():
    logout_user()
    flash(u'登出。')
    return redirect(url_for('main.index'))


@admin.route('/article/', methods=['GET', 'POST'])
@login_required
def article():
    form = PostArticleForm()
    article_list = Article.query.all()
    if form.validate_on_submit():
        article = Article(title=form.title.data, body=form.body.data, category_id=str(form.category_id.data.id), user_id=current_user.id)
        db.session.add(article)
        flash('添加好了')
        redirect(url_for('admin.index'))
    return render_template('admin/article.html', form=form, article_list=article_list)


@admin.route('/article/edit/<article_id>/', methods=['GET', 'POST'])
@login_required
def article_edit(article_id):
    article = Article.query.filter_by(id=article_id).first()
    if request.method == 'GET':
        form = PostArticleForm()
        form.title.data = article.title
        form.body.data = article.body
        form.category_id.data = article.category.id
        return render_template('admin/article_edit.html', form=form, article=article)
    elif request.method == 'POST':
        form = PostArticleForm()
        if form.validate_on_submit():
            article.title = form.title.data
            article.body = form.body.data
            article.category_id = str(form.category_id.data.id)
            db.session.commit()
            flash('修改成功')
        else:
            flash('修改失败')
        return render_template('admin/article_edit.html', form=form, article=article)


@admin.route('/article/del/', methods=['GET'])
@login_required
def article_del():
    if request.args.get('id') is not None and request.args.get('a') == 'del':
        x = Article.query.filter_by(id=request.args.get('id')).first()
        if x is not None:
            db.session.delete(x)
            db.session.commit()
            flash(u'已删除'+x.title)
            return redirect(url_for('admin.article'))
        flash(u'输入错误')
        return redirect(url_for('admin.article'))


@admin.route('/category', methods=['GET', 'POST'])
def category():
    category_list = Category.query.all()
    form = PostCategoryForm()
    if form.validate_on_submit():
        category = Category(name=form.name.data)
        db.session.add(category)
        flash(u'添加成功')
        return redirect(url_for('admin.index'))
    return render_template('admin/category.html', form=form, clist=category_list)


@admin.route('/category/del/', methods=['GET'])
@login_required
def category_del():
    if request.args.get('id') is not None and request.args.get('a') == 'del':
        x = Category.query.filter_by(id=request.args.get('id')).first()
        if x is not None:
            db.session.delete(x)
            db.session.commit()
            flash(u'已经删除'+x.name)
            return redirect(url_for('admin.category'))
        flash(u'重新输入')
        return redirect(url_for('admin.category'))
