import EventEmitter from 'events';
import assign from 'object-assign';

var ArticleStore = assign({}, EventEmitter.prototype, {
    filter: 'all',
    articles_list: [],
    getFilter: function() {
        return this.filter;
    },
    getArticles: function() {
        return this.articles_list;
    },
    getArticle: function(article_id) {
        var article = this.articles_list.filter((a) => a.id == article_id);
        if (article.length > 0) {
            return article[0];
        }
    },
    change_articles_filter: function(category_id) {
        console.log('get filter from dispatch', category_id);
        this.filter = category_id;
        this.emitChange();
    },
    download_articles: function(){
        this.fetch_articles(this);
    },
    fetch_articles: function(it) {
        fetch('/api/articles/').then(function(res){
            if (res.status == 200){
                console.log('download success.');
                return res.json();
            }
        }).then(function(json){
            it.articles_list = json['data'];
            it.emitChange();
        }).catch(function(ex){
            console.log('parsing failed', ex);
            return 0;
        });
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
});

export default ArticleStore;