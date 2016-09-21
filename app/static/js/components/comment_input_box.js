import React, {Component} from 'react';

class CommentInputBox extends Component {
    constructor (props) {
        super(props);
        this.state = {value: ''};
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    render() {
        return (
            <div>
                <div>{this.state.value}</div>
                <input
                    type='text' value={this.state.value} onChange={this.handleChange} placeholder='Please input.'
                />
            </div>
        );
    }
}

export default CommentInputBox;