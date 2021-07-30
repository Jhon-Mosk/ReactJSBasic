import initialState from './initialState';

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_STATUS_ACTION":
            return {
                ...state,
                showName: !state.showName,
            }
        default:
            return state
    }
}

export default profileReducer;