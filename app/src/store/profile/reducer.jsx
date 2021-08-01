import { CHANGE_USER_NAME, CHANGE_USER_STATUS } from "./actions";

const initialState = {
    showName: false,
    whenTrueStatus: 'В сети',
    whenFalseStatus: 'Не сети',
    name: '',
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_STATUS:
            return {
                ...state,
                showName: !state.showName,
            }

        case CHANGE_USER_NAME:
            return {
                ...state,
                name: action.payload
            }

        default:
            return state
    }
}
