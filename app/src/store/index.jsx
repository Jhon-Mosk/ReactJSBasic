import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { chatsReducer } from './chats';
import { messagesReducer } from './messages';
import { profileReducer } from './profile';
import { messageFormReducer } from './messageForm';
import { covid19Reducer } from './covid19'

const rootReducer = combineReducers({
    chats: chatsReducer,
    profile: profileReducer,
    messages: messagesReducer,
    messageForm: messageFormReducer,
    covid19: covid19Reducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistReducer(persistConfig, rootReducer), composeEnhancers(
    applyMiddleware(thunk),
));

export const persistor = persistStore(store);
