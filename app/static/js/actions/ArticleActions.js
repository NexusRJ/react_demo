import AppDispatcher from '../dispatcher/app_dispatcher'

var ArticleActions = {
    filterArticles: function(category_id){
        console.log('dispatch recive action.');
        AppDispatcher.dispatch({
            actionType: 'CHANGE_CATEGORY_FILTER',
            category_id: category_id
        });
    },
};

export default ArticleActions