import React, {Component} from 'react'
import ArticleList from './article_list'
import NavBar from './navbar'

class BlogApp extends Component {
    render () {
        return (
            <div>
                <NavBar />
                <ArticleList />
            </div>
        )
    }
}

export default BlogApp