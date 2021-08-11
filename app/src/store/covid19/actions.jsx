export const SELECT_COUNTRY = 'SELECT_COUNTRY';
export const STATUS_SELECT_COUNTRY_REQUEST = "STATUS_SELECT_COUNTRY_REQUEST";
export const STATUS_SELECT_COUNTRY_SUCCESS = "STATUS_SELECT_COUNTRY_SUCCESS";
export const STATUS_SELECT_COUNTRY_FAILURE = "STATUS_SELECT_COUNTRY_FAILURE";

export const createSelectCountry = (country) => ({
    type: SELECT_COUNTRY,
    payload: country,
});

export const createStatusRequest = () => ({
    type: STATUS_SELECT_COUNTRY_REQUEST,
});

export const createStatusSuccess = (country) => ({
    type: STATUS_SELECT_COUNTRY_SUCCESS,
    payload: country,
});

export const createStatusFailure = (error) => ({
    type: STATUS_SELECT_COUNTRY_FAILURE,
    payload: error,
});

export const getCountries = (api) => async (dispatch) => {
        dispatch(createStatusRequest);
        
        const [error, data] = await api();
        
        if(error) {
            dispatch(createStatusFailure(error));
        }

        if(data) {
            dispatch(createStatusSuccess(data));
        }
}