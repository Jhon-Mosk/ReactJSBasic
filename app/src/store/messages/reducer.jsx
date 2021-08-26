import { ADD_MESSAGE, LOAD_MESSAGES, REMOVE_MESSAGES } from "./actions";

const initialState = {
    messageList: {},
};

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messageList: {
                    ...state.messageList,
                    [action.payload.chatId]: action.payload.messages,
                    messageId: action.payload.messageId,
                }                
            };
        }

        case LOAD_MESSAGES: {            
            return {                
                ...state,
                messageList: {
                    [action.payload.chatId]: action.payload.messages,
                    messageId: action.payload.messageId,
                }         
            }
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
