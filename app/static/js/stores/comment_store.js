import EventEmitter from 'events';
import assign from 'object-assign';
import 'whatwg-fetch';

var CommentStore = assign({}, EventEmitter.prototype, {
    comments : {},
    getComments: function(article_id) {
        return this.comments[article_id];
    },
    download_comments: function(article_id) {
        this.fetch_comments(this, article_id);
    },
    post_comment: function(article_id, comment) {
        console.log('post comment.');
        this.post_comment_to_server(this, article_id, comment);
    },
    fetch_comments: function(it, article_id) {
        fetch('api/comments/' + article_id + '/').then(function(res) {
            if (res.status==200) {
                console.log('download comments for article ' + article_id + ' success.');
                return res.json();
            }
        }).then(function (json){
            it.comments[article_id] = json['data'];
            it.emitCommentsChange();
        }).catch(function(ex){
            console.log('parsing comments failed', ex);
        });
    },
    post_comment_to_server: function(it, article_id, comment) {
        fetch('api/comments/'+article_id + '/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'article_id': article_id,
                'comment': comment
            })
        }).then(function(res) {
            if (res.status==200) {
                console.log('post comment for article '+article_id+' success.');
                return res.json();
            }
        }).then(function (json){
            it.comments[article_id].push(json['data']);
            it.emitCommentsChange();
        });
    },
    emitCommentsChange: function () {
        this.emit('comment changed');
    },
    addCommentsChangeListener: function (callback) {
        this.on('comment changed', callback);
    },
    removeCommentsChangeListener: function (callback) {
        this.removeListener('comment changed', callback);
    }
});

export default CommentStore;