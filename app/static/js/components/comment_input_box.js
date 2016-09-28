import React, {Component} from 'react';
import CommentActions from '../actions/comment_actions';

class CommentInputBox extends Component {
    constructor (props) {
        super(props);
        this.state = {value: ''};
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    handleSubmit = (event) => {
        if(this.state.value == ''){
            alert('Please input comment.');
        }
        else{
            CommentActions.postComment(this.props.article_id, this.state.value);
            alert('Post success');
            this.handleReset();
        }
    }
    handleReset = () => {
        this.setState({value: ''});
    }
    render() {
        return (
            <div>
                <textarea className='comment-input-box'
                    type='text' value={this.state.value} onChange={this.handleChange} placeholder='Please input.'
                />
                <input className='comment_button' type='button' onClick={this.handleSubmit} value='提交' />
                <input className='comment_button' type='button' onClick={this.handleReset} value='重置' />
            </div>
        );
    }
}

export default CommentInputBox;