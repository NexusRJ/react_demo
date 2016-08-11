import React, {Component} from 'react'
import ArticleList from './article_list'
import NavBar from './navbar'
import {Link} from 'react-router'

class BlogApp extends Component {
    render () {
        return (
            <div>
                <NavBar />
                <div id='content' className='col-md-8'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default BlogApp