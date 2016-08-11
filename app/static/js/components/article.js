import React, {Component} from 'react'
import 'react-bootstrap'

class Article extends Component {
    PropTypes: {
        title: React.PropTypes.string,
    }
    render () {
        var float_right = {
            float: 'right',
        }
        return (
            <div className='article'>
                <div className='title'>
                    {this.props.title}
                </div>
                <div className='info-row row'>
                    <div className='col-md-6 author'>
                        作者:{this.props.author}
                    </div>
                    <div className='col-md-6 create-time'>
                        <div style={float_right}>创建时间:{this.props.create_time}</div>
                    </div>
                </div>
                <div className='row article-content'>
                    <div className='article-body'>
                        {this.props.children}
                    </div>
                    <div className='category-name'>
                        <div style={float_right}>目录:{this.props.category_name}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Article