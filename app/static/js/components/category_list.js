import React, {Component} from 'react'
import Category from './category'
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
    render () {
        var categoryNodes = this.state.categories.map(
            function(category) {
                return (
                    <Category key={category.id} category_name={category.name} />
                )
            })
        return (
            <div>
                {categoryNodes}
            </div>
        )
    }
}

export default CategoryList