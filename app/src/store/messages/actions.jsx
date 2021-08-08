export const ADD_MESSAGE = 'ADD_MESSAGE';

export const createAddMessage = (chatId, author, message) => ({
    type: ADD_MESSAGE,
    author,
    chatId,
    message,
});

