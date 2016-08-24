import { Dispatcher } from 'flux'
import ArticleStore from '../stores/ArticleStore'

var AppDispatcher = new Dispatcher()
AppDispatcher.register(function (action) {
    switch(action.actionType){
        case 'CHANGE_CATEGORY_FILTER':
            ArticleStore.change_articles_filter(action.category_id);
            ArticleStore.emitChange();
            break;
        default:
    }
})

export default AppDispatcher;