import { ADD_CHAT, REMOVE_CHAT } from "./actions";

const initialState = {
    chatList: [],
};

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT:            
            return {
                ...state,
                chatList: [
                    ...state.chatList,
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        avatar: action.payload.avatar,
                    },
                ],
            };

        case REMOVE_CHAT:
            return {                
                chatList: [
                    ...state.chatList.filter(item => item.id !== action.payload.id)
                ]
            }
        default:
            return state;
    }
};
