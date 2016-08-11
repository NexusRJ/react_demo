import React, {Component} from 'react'
import {Link} from 'react-router'

class NavHeader extends Component {
    render () {
        return (
            <div id='navbar'>
                <ul className='nav-bar row'>
                    <li><Link to='/'>首页</Link></li>
                    <li><Link to='/category'>分类</Link></li>
                    <li><Link to='/about'>关于</Link></li>
                </ul>
            </div>
        )
    }
}

export default NavHeader