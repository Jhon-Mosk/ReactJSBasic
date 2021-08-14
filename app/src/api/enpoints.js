export const API_ENDPOINT = 'https://api.covid19api.com/';

export const endpoints = {
    getSummary: 'summary', // Сводка новых и общих случаев заболевания по стране обновляется ежедневно.
    getCountries: 'countries', // Возвращает все доступные страны и провинции, а также краткую информацию о стране для запросов по странам.
    getDayOneAllStatus: 'dayone/country/', //все статусы по дням, начиная с первого случая для конкретной страны
};