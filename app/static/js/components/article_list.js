import React, {Component} from 'react'
import 'whatwg-fetch'
import Article from './article'

class ArticleList extends Component {
    constructor (props){
        super(props);
        this.state = {articles: []}
    }
    loadArticles (){
        console.log('start download articles')
        return fetch('/api/articles/').then(function(res){
            if (res.status == 200){
                return res.json()
            }
        }).catch(function(ex){
            console.log('parsing failed', ex)
        })
    }
    componentDidMount () {
        this.loadArticles().then((json) => {
            this.setState({articles: json['data']})
        });
        console.log(this.state.articles)
    }
    
    render () {
        var articleNodes = this.state.articles.map(
            function(article){
                return (
                    <Article key={article.id} author={article.user} create_time={article.create_time} 
                    category_name={article.category} 
                    title={article.title}>
                        {article.body}
                    </Article>
                );
            });
        return (
            <div id='article-list' className='col-md-8'>
                {articleNodes}
            </div>
        )
    }
}

export default ArticleList