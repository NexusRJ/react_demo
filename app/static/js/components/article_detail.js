import React, {Component} from 'react'
import ArticleStore from '../stores/article_store'
import ArticleActions from '../actions/article_actions'
import Article from './article'
import CommentList from './comment_list'

class ArticleDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {'article': ''}
    }
    componentDidMount () {
        ArticleActions.downloadArticle(this.props.params.id)
        ArticleStore.addOneArticleInitListener(this.loadArticle)
    }
    componentWillUnmount () {
        ArticleStore.removeOneArticleInitListener(this.loadArticle)
    }
    loadArticle = () => {
        console.log('load article')
        this.setState({
            'article': ArticleStore.getArticle(this.props.params.id)
        })
    }
    render () {
        console.log('render articles.')
        var article = this.state.article
        return (
            <div>
                <Article key={article.id} author={article.user} create_time={article.create_time} category_name={article.category} title={article.title} path='#'>
                        {article.body}
                </Article>
                <CommentList article_id={this.props.params.id} />
            </div>
        )
    }
}

export default ArticleDetail