import AppDispatcher from '../dispatcher/app_dispatcher'

var CommentActions = {
    // filterComments: function(category_id) {
    //     console.log('dispatch recive filter action.');
    //     AppDispatcher.dispatch({
    //         actionType: 'CHANGE_CATEGORY_FILTER',
    //         category_id: category_id
    //     });
    // },
    downloadComments: function(article_id) {
        console.log('dispatch recive download Comments action');
        AppDispatcher.dispatch({
            actionType: 'DOWNLOAD_COMMENTS',
            article_id: article_id
        })
    },
    // downloadComment: function(article_id) {
    //     console.log('dispatch recive download one article');
    //     AppDispatcher.dispatch({
    //         actionType: 'DOWNLOAD_ARTICLE',
    //         article_id: article_id
    //     })
    // },
    // loadComments: function(){
    //     console.log('dispatch recive load Comments action');
    //     AppDispatcher.dispatch({
    //         actionType: 'LOAD_Comments',
    //     })
    // }
};

export default CommentActions