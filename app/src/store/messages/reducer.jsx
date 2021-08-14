import { ADD_MESSAGE, REMOVE_MESSAGES } from "./actions";

const initialState = {
    // to be stored like this {[chatId]: [{id, text, author}]}
    messageList: {},
};

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const currentList = state.messageList[action.payload.chatId] || [];
            return {
                ...state,
                messageList: {
                    ...state.messageList,
                    [action.payload.chatId]: [
                        ...currentList,
                        {
                            message: action.payload.message,
                            id: `${action.payload.chatId}${currentList.length}`,
                            author: action.payload.author,
                        },
                    ],
                },
            };
        }

        case REMOVE_MESSAGES: {
            let newMessageList = state.messageList;
            delete newMessageList[action.payload.chatId];    
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
