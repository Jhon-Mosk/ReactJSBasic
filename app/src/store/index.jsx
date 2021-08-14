import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { chatsReducer } from './chats';
import { messagesReducer } from './messages';
import { profileReducer } from './profile';
import { messageFormReducer } from './messageForm';

const rootReducer = combineReducers({
    chats: chatsReducer,
    profile: profileReducer,
    messages: messagesReducer,
    messageForm: messageFormReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

//Ответ бота через Middleware
const botAnswerMiddleware = store => next => action => {
    // if (action.type === "ADD_MESSAGE" && action.author !== 'Бот') {
    //     let botMessage = {
    //         author: 'Бот',
    //         text: generateBotPhrase(),
    //     }

    //     setTimeout(() => {
    //         store.dispatch(createAddMessage(action.chatId, botMessage.author, botMessage.text));
    //     }, 1500);
    // }

    return next(action)
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistReducer(persistConfig, rootReducer), composeEnhancers(
    applyMiddleware(botAnswerMiddleware, thunk),
));

export const persistor = persistStore(store);
