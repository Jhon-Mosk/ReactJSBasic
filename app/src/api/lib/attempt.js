import { makeRequest } from "./makeRequest"

export const attempt = async (url, config) => {    
    try {
        const result = await makeRequest(url, config);
        if(result.message === "Not Found") {
            return [result, null];
        } else {            
            return [null, result];
        }
    } catch (e) {
        console.warn(e);
        return [e, null];
    }
}