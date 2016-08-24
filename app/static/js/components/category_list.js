import React, {Component} from 'react'
import Category from './category'
import ArticleActions from '../actions/ArticleActions'
import 'whatwg-fetch'

class CategoryList extends Component {
    constructor (props) {
        super(props)
        this.state = {categories: []}
    }
    loadCategories (){
        console.log('start download categories')
        return fetch('/api/categories/').then(function(res){
            if (res.status == 200){
                return res.json()
            }
        }).catch(function(ex){
            console.log('parsing failed', ex)
        })
    }
    componentDidMount () {
        this.loadCategories().then(json => {
            this.setState(
                {categories: json['data']}
            )
        });
    }
    showAllArticles () {
        ArticleActions.filterArticles('all')
    }
    render () {
        var categoryNodes = this.state.categories.map(
            function(category) {
                return (
                    <Category key={category.id} category_name={category.name} category_id={category.id} />
                )
            })
        return (
            <div>
                <div className='category' onClick={this.showAllArticles.bind(this)}>
                    所有文章
                </div>
                {categoryNodes}
            </div>
        )
    }
}

export default CategoryList