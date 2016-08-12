import React, {Component} from 'react'
import CategoryList from './category_list'

class SideBar extends Component {
    render () {
        return (
            <div id='sidebar' className='col-md-3'>
                <CategoryList />
            </div>
        )
    }
}

export default SideBar