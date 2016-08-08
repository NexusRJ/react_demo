import React, {Component} from 'react'

class Article extends Component {
    render () {
        return (
            <div>
                <div className='title'>
                    {this.props.title}
                </div>
                <div className='body'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Article