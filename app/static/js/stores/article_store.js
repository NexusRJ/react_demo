import EventEmitter from 'events';
import assign from 'object-assign';

var ArticleStore = assign({}, EventEmitter.prototype, {
    filter: 'all',
    articles_list: [],
    articles_dict: {},
    getFilter: function() {
        return this.filter;
    },
    getArticles: function() {
        return this.articles;
    },
    getArticle: function(article_id) {
        return this.articles_dict[article_id];
    },
    change_articles_filter: function(category_id) {
        console.log('get filter from dispatch', category_id);
        this.filter = category_id;
    },
    download_article: function (article_id) {
        this.fetch_article(this, article_id);
    },
    download_articles: function(){
        this.fetch_articles(this);
    },
    fetch_article: function(it, article_id) {
        fetch('api/article/'+article_id).then(function(res){
            if (res.status == 200){
                console.log('download article ' + article_id + ' success.');
                return res.json();
            }
        }).then(function(json){
            it.articles_dict[article_id] = json['data'];
            it.emitOneArticleInit();
        }).catch(function(ex){
            console.log('parsing failed 2', ex);
        });
    },
    fetch_articles: function(it) {
        fetch('/api/articles/').then(function(res){
            if (res.status == 200){
                console.log('download success.');
                return res.json();
            }
        }).then(function(json){
            it.articles = json['data'];
            it.emitInit();
        }).catch(function(ex){
            console.log('parsing failed', ex);
            return 0;
        });
    },
    emitOneArticleInit: function () {
        this.emit('init one article');
    },
    emitInit: function () {
        this.emit('init');
    },
    emitChange: function() {
        this.emit('change');
    },
    addOneArticleInitListener: function(callback) {
        this.on('init one article', callback);
    },
    removeOneArticleInitListener: function(callback) {
        this.removeListener('init one article', callback);
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
        this.removeListener('init', callback);
    }
});

export default ArticleStore;