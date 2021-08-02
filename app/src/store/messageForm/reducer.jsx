import { HIDE_MESSAGE_FORM, SHOW_MESSAGE_FORM } from "./actions"

const initialState = {
    messageFormVisibility: false,
}

export const messageFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MESSAGE_FORM:
            return {
                ...state,
                messageFormVisibility: true,
            }

        case HIDE_MESSAGE_FORM:
            return {
                ...state,
                messageFormVisibility: false,
            }

        default: {
            return state;
        }
    }
}