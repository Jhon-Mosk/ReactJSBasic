import { API_ENDPOINT } from "../enpoints";

export const makeRequest = (url, config) => fetch (
    [
        API_ENDPOINT,
        url,
    ].join(''), config).then((response) => response.json()
)
