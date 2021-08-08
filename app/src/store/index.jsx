import { combineReducers, createStore } from 'redux';
import { chatsReducer } from './chats';
import { messagesReducer } from './messages';
import { profileReducer } from './profile';
import { messageFormReducer} from './messageForm';

const rootReducer = combineReducers({
    chats: chatsReducer,
    profile: profileReducer,
    messages: messagesReducer,
    messageForm: messageFormReducer,
})

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&                        
    window.__REDUX_DEVTOOLS_EXTENSION__());
