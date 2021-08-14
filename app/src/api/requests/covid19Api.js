import { endpoints } from "../enpoints";
import { attempt } from "../lib/attempt";

export const covid19Api = {
    getSummary: async () => attempt(endpoints.getSummary),
    getCountries: async () => attempt(endpoints.getCountries),
    getDayOneAllStatus: async (country) => attempt([endpoints.getDayOneAllStatus, country].join('')),
}