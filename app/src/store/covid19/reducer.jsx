import { SELECT_COUNTRY, STATUS_COUNTRIES_LIST_FAILURE, STATUS_COUNTRIES_LIST_REQUEST, STATUS_COUNTRIES_LIST_SUCCESS, STATUS_DAY_ONE_ALL_FAILURE, STATUS_DAY_ONE_ALL_REQUEST, STATUS_DAY_ONE_ALL_SUCCESS, STATUS_SUMMARY_STATISTICS_FAILURE, STATUS_SUMMARY_STATISTICS_REQUEST, STATUS_SUMMARY_STATISTICS_SUCCESS } from "./actions";
import { STATUSES } from "./statuses";

const initialState = {    
    country: "Global",
};

export const covid19Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_COUNTRY: {            
            return {
                ...state,
                selectCountry: action.payload,
            };
        }

        case STATUS_COUNTRIES_LIST_REQUEST: {
            return {
                ...state,
                countriesListLoadingStatus: STATUSES.REQUEST,
            }
        }

        case STATUS_COUNTRIES_LIST_SUCCESS: {
            return {
                ...state,
                countriesList: action.payload,
                countriesListLoadingStatus: STATUSES.SUCCESS,
            }
        }

        case STATUS_COUNTRIES_LIST_FAILURE: {
            return {
                ...state,
                countriesListLoadingStatus: STATUSES.FAILURE,
                countriesListError: action.payload,
            }
        }

        case STATUS_SUMMARY_STATISTICS_REQUEST: {
            return {
                ...state,
                summaryStatisticsLoadingStatus: STATUSES.REQUEST,
            }
        }

        case STATUS_SUMMARY_STATISTICS_SUCCESS: {
            return {
                ...state,
                summaryStatistics: action.payload,
                summaryStatisticsLoadingStatus: STATUSES.SUCCESS,
            }
        }

        case STATUS_SUMMARY_STATISTICS_FAILURE: {
            return {
                ...state,
                summaryStatisticsLoadingStatus: STATUSES.FAILURE,
                summaryStatisticsError: action.payload,
            }
        }

        case STATUS_DAY_ONE_ALL_REQUEST: {
            return {
                ...state,
                dayOneAllLoadingStatus: STATUSES.REQUEST,
            }
        }

        case STATUS_DAY_ONE_ALL_SUCCESS: {
            return {
                ...state,
                dayOneAll: action.payload,
                dayOneAllLoadingStatus: STATUSES.SUCCESS,
            }
        }

        case STATUS_DAY_ONE_ALL_FAILURE: {
            return {
                ...state,
                dayOneAllLoadingStatus: STATUSES.FAILURE,
                dayOneAllError: action.payload,
            }
        }

        default:
            return state;
    }
};
