import React, {Component} from 'react'
import 'whatwg-fetch'

class ArticleList extends Component {
    constructor (props){
        super(props);
        this.state = {articles: []}
    }
    loadArticles (){
        console.log('start download articles')
        fetch('/api/articles').then(function(response){
            return response.json()
        }).then(function(json){
            if (response.status == 200){
                this.setState({articles: json['data']})
            }
        }).catch(function(ex){
            console.log('parsing failed', ex)
        })
    }
    render () {
        return (
            <div>
                <Article articles={this.state.articles} />
            </div>
        )
    }
}

export default ArticleList