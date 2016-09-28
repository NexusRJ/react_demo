import React, {Component} from 'react';
import Comment from './comment';
import CommentActions from '../actions/comment_actions';
import CommentStore from '../stores/comment_store';
import CommentInputBox from './comment_input_box';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {'comments': []};
    }
    componentWillMount () {
        CommentStore.addChangeListener(this.loadComments);
        CommentActions.downloadComments(this.props.article_id);
    }
    componentDidMount() {
        this.loadComments();
    }
    componentWillUnmount () {
        CommentStore.removeChangeListener(this.loadComments);
    }
    loadComments = () => {
        console.log('load comments');
        this.setState({
            'comments': CommentStore.getComments(this.props.article_id)
        });
    }
    render () {
        console.log('render comments.');
        if (this.state.comments === undefined) {
            var commentNodes = '';
        }
        else {
            commentNodes = this.state.comments.map(
                function(comment){
                    return (
                        <Comment key={comment.comment_id} content={comment.content} create_time={comment.create_time}></Comment>
                        );
                }
            );
        }
        return (
            <div id='comment-box'>
                <CommentInputBox article_id={this.props.article_id} />
                {commentNodes}
            </div>
        );
    }
}

export default CommentList;