import AppDispatcher from '../dispatcher/app_dispatcher';

var ArticleActions = {
    filterArticles: function(category_id) {
        console.log('dispatch recive filter action.');
        AppDispatcher.dispatch({
            actionType: 'CHANGE_CATEGORY_FILTER',
            category_id: category_id
        });
    },
    downloadArticles: function() {
        console.log('dispatch recive download articles action');
        AppDispatcher.dispatch({
            actionType: 'DOWNLOAD_ARTICLES',
        });
    },
    downloadArticle: function(article_id) {
        console.log('dispatch recive download one article');
        AppDispatcher.dispatch({
            actionType: 'DOWNLOAD_ARTICLE',
            article_id: article_id
        });
    },
    // loadArticles: function(){
    //     console.log('dispatch recive load articles action');
    //     AppDispatcher.dispatch({
    //         actionType: 'LOAD_ARTICLES',
    //     })
    // }
};

export default ArticleActions;