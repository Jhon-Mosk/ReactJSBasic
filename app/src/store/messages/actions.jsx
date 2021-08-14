export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGES = 'REMOVE_MESSAGES';

export const createAddMessage = (chatId, author, message) => ({
    type: ADD_MESSAGE,
    payload: {
        author,
        chatId,
        message,
    },
});

export const createRemoveMessages = (chatId) => ({
    type: REMOVE_MESSAGES,
    payload: {
        chatId,
    },
});

