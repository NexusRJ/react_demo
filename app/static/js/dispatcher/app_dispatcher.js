import { Dispatcher } from 'flux';
import ArticleStore from '../stores/article_store';
import CommentStore from '../stores/comment_store';

var AppDispatcher = new Dispatcher();
AppDispatcher.register(function (action) {
    switch(action.actionType){
    case 'CHANGE_CATEGORY_FILTER':
        ArticleStore.change_articles_filter(action.category_id);
        break;
    case 'DOWNLOAD_ARTICLES':
        ArticleStore.download_articles();
        break;
    case 'DOWNLOAD_COMMENTS':
        CommentStore.download_comments(action.article_id);
        break;
    case 'POST_COMMENT':
        CommentStore.post_comment(action.article_id, action.comment);
        break;
    default:
    }
});

export default AppDispatcher;