import { Dispatcher } from 'flux'
import ArticleStore from '../stores/article_store'

var AppDispatcher = new Dispatcher()
AppDispatcher.register(function (action) {
    switch(action.actionType){
        case 'CHANGE_CATEGORY_FILTER':
            ArticleStore.change_articles_filter(action.category_id);
            ArticleStore.emitChange();
            break;
        case 'DOWNLOAD_ARTICLES':
            ArticleStore.download_articles();
            break;
        case 'DOWNLOAD_ARTICLE':
            ArticleStore.download_article(action.article_id);
        default:
    }
})

export default AppDispatcher;