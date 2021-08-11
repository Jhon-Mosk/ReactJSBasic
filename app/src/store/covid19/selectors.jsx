export const getSelectCountry = state => state.covid19.selectCountry;
export const getCountriesList = state => state.covid19.countriesList;
export const getCountriesListLoadingStatus = state => state.covid19.countriesListLoadingStatus;
export const getCountriesListError = (state) => state.covid19.countriesListError;

export const getSummaryStatisticsData = state => state.covid19.summaryStatistics;
export const getSummaryStatisticsLoadingStatus = state => state.covid19.summaryStatisticsLoadingStatus;
export const getSummaryStatisticsError = (state) => state.covid19.summaryStatisticsError;

export const getDayOneAllData = state => state.covid19.dayOneAll;
export const getDayOneAllLoadingStatus = state => state.covid19.dayOneAllLoadingStatus;
export const getDayOneAllError = (state) => state.covid19.dayOneAllError;
