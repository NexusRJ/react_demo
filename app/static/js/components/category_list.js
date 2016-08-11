import React, {Component} from 'react'

class CategoryList extends Component {
    constructor (props) {
        super(props)
        this.state = {categories: []}
    }
    
    render () {
        return (
            <div>
                This is CategoryList.
            </div>
        )
    }
}

export default CategoryList