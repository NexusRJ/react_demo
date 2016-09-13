import React, {Component} from 'react';
import Comment from './comment';
import CommentActions from '../actions/comment_actions';
import CommentStore from '../stores/comment_store';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {'comments': []}
    }
    componentWillMount () {
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
    }
    render () {
        console.log('render comments.')
        var commentNodes = this.state.comments.map(
            function(comment){
                return (
                    <Comment key={comment.comment_id} content={comment.content}>
                    </Comment>
                    )
            }
        )
        return (
            <div>
                {commentNodes}
            </div>
        )
    }
}

export default CommentList