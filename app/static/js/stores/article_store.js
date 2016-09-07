import EventEmitter from 'events'
import assign from 'object-assign'

var ArticleStore = assign({}, EventEmitter.prototype, {
    filter: 'all',
    articles_list: [],
    getFilter: function() {
        return this.filter
    },
    getArticles: function() {
        return this.articles
    },
    change_articles_filter: function(category_id) {
        console.log('get filter from dispatch', category_id)
        this.filter = category_id;
    },
    download_articles: function(){
        this.fetch_articles(this)
    },
    fetch_articles: function(it) {
        fetch('/api/articles/').then(function(res){
            if (res.status == 200){
                console.log('download success.')
                // var articles = res.json()['data']
                // console.log(articles)
                return res.json()
                }
            }).then(function(json){
                it.articles = json['data']
                it.emitInit()
            }).catch(function(ex){
            console.log('parsing failed', ex)
            return 0
            })
    },
    emitInit: function () {
        this.emit('init');
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    addInitListener: function(callback) {
        this.on('init', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    removeInitListener: function(callback) {
        this.removeListener('init', callback)
    }
});

export default ArticleStore