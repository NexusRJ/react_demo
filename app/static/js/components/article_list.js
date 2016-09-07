import React, {Component} from 'react';
import Article from './article';
import ArticleStore from '../stores/article_store';
import ArticleActions from '../actions/article_actions';
import 'whatwg-fetch';

class ArticleList extends Component {
    constructor (props){
        super(props);
        this.state = {articles: [], category_filter: 'all'}
    }
    componentDidMount () {
        ArticleActions.downloadArticles()
        ArticleStore.addInitListener(this.loadArticles)
        ArticleStore.addChangeListener(this.changeArticleFilter)
    }
    componentWillUnmount () {
        ArticleStore.removeChangeListener(this.changeArticleFilter)
        ArticleStore.removeInitListener(this.loadArticles)
    }
    loadArticles = () => {
        console.log('load articles')
        this.setState({
            'articles': ArticleStore.getArticles()
        })
    }
    changeArticleFilter = () => {
        this.setState({
            'category_filter': ArticleStore.getFilter()
        });
    }

    render () {
        console.log('state:')
        console.log(this.state)
        var category_filter = this.state.category_filter;
        if (category_filter == 'all'){
            var articles = this.state.articles;
        }
        else {
            var articles = this.state.articles.filter((a) => a.category_id == category_filter)
        }
        var articleNodes = articles.map(
            function(article){
                var path = '/article/' + article.id
                return (
                    <Article key={article.id} author={article.user} create_time={article.create_time} category_name={article.category} title={article.title} path={path}>
                        {article.body}
                    </Article>
                );
            });
        return (
            <div id='article-list'>
                {articleNodes}
            </div>
        )
    }
}

export default ArticleList