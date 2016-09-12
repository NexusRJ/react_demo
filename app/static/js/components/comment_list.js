import React, {Component} from 'react';
import Comment from './comment';
import CommentActions from '../actions/comment_actions';
import CommentStore from '../stores/comment_store';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount () {
        CommentActions.downloadComments(this.props.article_id)
        CommentStore.addCommentsInitListener(this.loadComments)
    }
    componentWillUnmount () {
        CommentStore.removeCommentsInitListener(this.loadComments)
    }
    loadComments = () => {
        console.log('load comments');
        this.setState({
            'comments': CommentStore.getComments(this.props.article_id)
        });
        console.log(this.state);
    }
    render () {
        console.log(this.state)
        return (
            <div>
                {this.state.comments}
            </div>
        )
    }
}

export default CommentList