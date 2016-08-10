import React, {Component} from 'react'

class NavHeader extends Component {
    render () {
        return (
            <div id='navbar'>
                <ul className='nav-bar row'>
                    <li>首页</li>
                    <li>分类</li>
                    <li>关于</li>
                </ul>
            </div>
        )
    }
}

export default NavHeader