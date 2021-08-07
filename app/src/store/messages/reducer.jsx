import { ADD_MESSAGE, REMOVE_MESSAGES } from "./actions";

const initialState = {
    // to be stored like this {[chatId]: [{id, text, author}]}
    messageList: {},
};

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const currentList = state.messageList[action.chatId] || [];
            return {
                ...state,
                messageList: {
                    ...state.messageList,
                    [action.chatId]: [
                        ...currentList,
                        {
                            message: action.message,
                            id: `${action.chatId}${currentList.length}`,
                            author: action.author,
                        },
                    ],
                },
            };
        }

        case REMOVE_MESSAGES: {
            let newMessageList = state.messageList;
            delete newMessageList[action.chatId];    
            return {
                ...state,
                messageList: {
                    ...newMessageList,
                },
            };
        }

        default:
            return state;
    }
};
