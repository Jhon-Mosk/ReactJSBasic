import { ADD_CHAT, REMOVE_CHAT } from "./actions";

const initialState = {
    chatList: [],
};

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT:
            //проверка какой id можно установить
            let idNumber = state.chatList.length;
            for(let item of state.chatList) {
                if(idNumber == item.id.slice(2)) {
                    idNumber++;
                }
            }
            return {
                ...state,
                chatList: [
                    ...state.chatList,
                    {
                        id: `id${idNumber}`,
                        name: action.name,
                        avatar: action.avatar,
                    },
                ],
            };

        case REMOVE_CHAT:
            return {                
                chatList: [
                    ...state.chatList.filter(item => item.id !== action.id)
                ]
            }
        default:
            return state;
    }
};
