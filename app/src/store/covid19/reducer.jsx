import { SELECT_COUNTRY, STATUS_SELECT_COUNTRY_FAILURE, STATUS_SELECT_COUNTRY_REQUEST, STATUS_SELECT_COUNTRY_SUCCESS } from "./actions";
import { STATUSES } from "./statuses";

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

        case STATUS_SELECT_COUNTRY_REQUEST: {
            return {
                ...state,
                countriesListLoadingStatus: STATUSES.REQUEST,
            }
        }

        case STATUS_SELECT_COUNTRY_SUCCESS: {
            return {
                ...state,
                countriesList: action.payload,
                countriesListLoadingStatus: STATUSES.SUCCESS,
            }
        }

        case STATUS_SELECT_COUNTRY_FAILURE: {
            return {
                ...state,
                countriesListLoadingStatus: STATUSES.FAILURE,
                countryError: action.payload,
            }
        }

        default:
            return state;
    }
};
