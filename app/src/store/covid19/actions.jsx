export const SELECT_COUNTRY = 'SELECT_COUNTRY';
export const STATUS_COUNTRIES_LIST_REQUEST = "STATUS_COUNTRIES_LIST_REQUEST";
export const STATUS_COUNTRIES_LIST_SUCCESS = "STATUS_COUNTRIES_LIST_SUCCESS";
export const STATUS_COUNTRIES_LIST_FAILURE = "STATUS_COUNTRIES_LIST_FAILURE";

export const createSelectCountry = (country) => ({
    type: SELECT_COUNTRY,
    payload: country,
});

export const createCountriesListStatusRequest = () => ({
    type: STATUS_COUNTRIES_LIST_REQUEST,
});

export const createCountriesListStatusSuccess = (data) => ({
    type: STATUS_COUNTRIES_LIST_SUCCESS,
    payload: data,
});

export const createCountriesListStatusFailure = (error) => ({
    type: STATUS_COUNTRIES_LIST_FAILURE,
    payload: error,
});

export const getCountries = (api) => async (dispatch) => {
        dispatch(createCountriesListStatusRequest);
        
        const [error, data] = await api();
        
        if(error) {
            dispatch(createCountriesListStatusFailure(error));
        }

        if(data) {
            dispatch(createCountriesListStatusSuccess(data));
        }
}

export const STATUS_SUMMARY_STATISTICS_REQUEST = "STATUS_SUMMARY_STATISTICS_REQUEST";
export const STATUS_SUMMARY_STATISTICS_SUCCESS = "STATUS_SUMMARY_STATISTICS_SUCCESS";
export const STATUS_SUMMARY_STATISTICS_FAILURE = "STATUS_SUMMARY_STATISTICS_FAILURE";

export const createSummaryStatisticsStatusRequest = () => ({
    type: STATUS_SUMMARY_STATISTICS_REQUEST,
});

export const createSummaryStatisticsStatusSuccess = (data) => ({
    type: STATUS_SUMMARY_STATISTICS_SUCCESS,
    payload: data,
});

export const createSummaryStatisticsStatusFailure = (error) => ({
    type: STATUS_SUMMARY_STATISTICS_FAILURE,
    payload: error,
});

export const getSummaryStatistics = (api) => async (dispatch) => {
        dispatch(createSummaryStatisticsStatusRequest);
        
        const [error, data] = await api();
        
        if(error) {
            dispatch(createSummaryStatisticsStatusFailure(error));
        }

        if(data) {
            dispatch(createSummaryStatisticsStatusSuccess(data));
        }
}

export const STATUS_DAY_ONE_ALL_REQUEST = "STATUS_DAY_ONE_ALL_REQUEST";
export const STATUS_DAY_ONE_ALL_SUCCESS = "STATUS_DAY_ONE_ALL_SUCCESS";
export const STATUS_DAY_ONE_ALL_FAILURE = "STATUS_DAY_ONE_ALL_FAILURE";

export const createDayOneAllRequest = () => ({
    type: STATUS_DAY_ONE_ALL_REQUEST,
});

export const createDayOneAllSuccess = (data) => ({
    type: STATUS_DAY_ONE_ALL_SUCCESS,
    payload: data,
});

export const createDayOneAllFailure = (error) => ({
    type: STATUS_DAY_ONE_ALL_FAILURE,
    payload: error,
});

export const getDayOneAllStatus = (api) => async (dispatch) => {
        dispatch(createDayOneAllRequest);
        
        const [error, data] = await api();
        
        if(error) {
            dispatch(createDayOneAllFailure(error));
        }

        if(data) {
            dispatch(createDayOneAllSuccess(data));
        }
}