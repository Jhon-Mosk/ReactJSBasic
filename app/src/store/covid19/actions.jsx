export const SELECT_COUNTRY = 'SELECT_COUNTRY';

export const createSelectCountry = (country) => ({
    type: SELECT_COUNTRY,
    payload: country,
});
