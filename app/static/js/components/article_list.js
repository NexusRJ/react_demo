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
    loadArticles (){
        console.log('start download articles')
        return fetch('/api/articles/').then(function(res){
            if (res.status == 200){
                console.log('download success.')
                return res.json()
                }
            }).catch(function(ex){
            console.log('parsing failed', ex)
        })
    }
    componentDidMount () {
        this.loadArticles().then(json => {
            this.setState({articles: json['data']});
        });
        ArticleStore.addChangeListener(this.changeArticleFilter)
    }
    componentWillUnmount () {
        ArticleStore.removeChangeListener(this.changeArticleFilter)
    }
    changeArticleFilter = () => {
        this.setState({
            'category_filter': ArticleStore.getFilter()
        });
    }

    render () {
        var category_filter = this.state.category_filter;
        if (category_filter == 'all'){
            var articles = this.state.articles;
        }
        else {
            var articles = this.state.articles.filter((a) => a.category_id == category_filter)
        }
        // var articles = this.state.articles;
        var articleNodes = articles.map(
            function(article){
                return (
                    <Article key={article.id} author={article.user} create_time={article.create_time} category_name={article.category} title={article.title}>
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