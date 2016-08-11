import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import BlogApp from './components/blog_app';
import ArticleList from './components/article_list';
import CategoryList from './components/category_list';
import About from './components/about';
import '../css/custom.css';

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path='/' component={BlogApp}>
            <IndexRoute component={ArticleList} />
            <Route path='/category' component={CategoryList} />
            <Route path='/about' component={About} />
        </Route>
    </Router>
    ),
    document.getElementById('blog-app')
);