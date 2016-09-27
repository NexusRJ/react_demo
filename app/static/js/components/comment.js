import React, {Component} from 'react';

class Comment extends Component {
    render () {
        return (
            <div className='comment'>
                <p className='comment-content'>{this.props.content}</p>
                <p className='comment-time'>{this.props.create_time}</p>
            </div>
        );
    }
}

export default Comment;