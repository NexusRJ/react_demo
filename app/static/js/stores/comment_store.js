import EventEmitter from 'events';
import assign from 'object-assign';
import 'whatwg-fetch';

var CommentStore = assign({}, EventEmitter.prototype, {
    comments : {},
    getComments: function(article_id) {
        return this.comments[article_id]
    },
    download_comments: function(article_id) {
        this.fetch_comments(this, article_id)
    },
    fetch_comments: function(it, article_id) {
        fetch('api/comments/' + article_id).then(function(res) {
            if (res.status==200) {
                console.log('download comments for article ' + article_id + ' success.');
                return res.json()
            }
        }).then(function (json){
            it.comments[article_id] = json['data']
            it.emitCommentsInit()
        }).catch(function(ex){
            console.log('parsing comments failed', ex);
        })
    },
    emitCommentsInit: function () {
        this.emit('comment init');
    },
    addCommentsInitListener: function (callback) {
        this.on('comment init', callback);
    },
    removeCommentsInitListener: function (callback) {
        this.removeListener('comment init', callback)
    }
})

export default CommentStore