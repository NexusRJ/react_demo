import React, {Component} from 'react';

class CommentInputBox extends Component {
    constructor (props) {
        super(props);
        this.state = {value: ''};
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    handleSubmit = (event) => {
        alert(this.state.value);
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