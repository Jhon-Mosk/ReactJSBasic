import initialState from './initialState';

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "EXAMPLE_ACTION":
            return {
                ...state,
                showName: !state.showName
            }
        default:
            return state
    }
}

export default profileReducer;