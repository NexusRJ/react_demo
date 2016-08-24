import React, {Component} from 'react'
import ArticleActions from '../actions/ArticleActions'

class Category extends Component {
    changeFilter () {
        ArticleActions.filterArticles(this.props.category_id)
        // console.log('send filterArticles action.')
        // console.log(this.props.category_id)
    }
    render () {
        console.log(this.props)
        return (
            <div className='category' onClick={this.changeFilter.bind(this)}>
                {this.props.category_name}
            </div>
        )
    }
}

export default Category