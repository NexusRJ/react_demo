import React, {Component} from 'react';

class Comment extends Component {
    render () {
        return (
            <div>
                <p>{this.props.content}</p>
                <p>{this.props.create_time}</p>
            </div>
        );
    }
}

export default Comment;