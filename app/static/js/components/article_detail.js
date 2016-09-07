import React, {Component} from 'react'
import ArticleStore from '../stores/article_store'
import ArticleActions from '../actions/article_actions'
import Article from './article'

class ArticleDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {'article': ''}
    }
    componentDidMount () {
        ArticleActions.downloadArticle(this.props.params.id)
        console.log(1)
        ArticleStore.addOneArticleInitListener(this.loadArticle)
        console.log(2)
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
        var article = this.state.article
        return (
            <div>
                <Article key={article.id} author={article.user} create_time={article.create_time} category_name={article.category} title={article.title} path='#'>
                        {article.body}
                    </Article>
            </div>
        )
    }
}

export default ArticleDetail