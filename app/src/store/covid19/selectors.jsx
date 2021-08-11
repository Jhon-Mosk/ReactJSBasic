export const getSelectCountry = state => state.covid19.country;
export const getCountriesList = state => state.covid19.countriesList;
export const getCountriesListLoadingStatus = state => state.covid19.countriesListLoadingStatus;

export const getSelectStatus = (state) => state.covid19.data;
export const getSelectStatusError = (state) => state.covid19.error;
export const getSelectStatusLoading = (state) => state.covid19.loadingStatus;