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
};

export default ArticleActions;