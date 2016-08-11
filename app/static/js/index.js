import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import BlogApp from './components/blog_app';
import '../css/custom.css'

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path='/' component={BlogApp} />
        <Route path='/category' />
        <Route path='/about' />
    </Router>
    ),
    document.getElementById('blog-app')
);