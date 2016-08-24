import EventEmitter from 'events'
import assign from 'object-assign'

var ArticleStore = assign({}, EventEmitter.prototype, {
    filter: '',
    getFilter: function () {
        return this.filter;
    },
    change_articles_filter: function(category_id) {
        console.log('get filter from dispatch', category_id)
        this.filter = category_id;
    },
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

export default ArticleStore