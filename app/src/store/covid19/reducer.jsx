import { SELECT_COUNTRY } from "./actions";

const initialState = {    
    country: "Global",
};

export const covid19Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_COUNTRY: {            
            return {
                ...state,
                country: action.payload,
            };
        }

        default:
            return state;
    }
};
