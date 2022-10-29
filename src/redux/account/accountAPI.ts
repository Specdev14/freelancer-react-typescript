import axios from "axios";
import { apiCall, baseURL } from "../apiCall";

export const setTokens = (data: any) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
    localStorage.setItem('access-token', data.access_token)
    localStorage.setItem('refresh-token', data.refresh_token)
    localStorage.setItem('device-token', data.device_token)
}

export const removeTokens = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
    localStorage.removeItem('device-token')
    window.location.reload();
}

export const refreshToken = (previous: boolean, error?: any) => {
    return axios(`${baseURL}/refresh-token`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            'accept': 'application/json',
            'Accept-Language': `${localStorage.getItem('i18nextLng')}`,
            'refresh-token': localStorage.getItem('refresh-token'),
            'device-token': localStorage.getItem('device-token'),
            'access-token': localStorage.getItem('access-token'),
        }
    } as any).then(response => {
        setTokens(response.data.data);
        if (previous && error) {
            const { config } = error.response;
            return apiCall(config.url, {
                method: config.method,
                body: config.data,
                headers: config.headers
            } as any);
        } else {
            return Promise.resolve(response.data);
        }
    }).catch(error => {
        removeTokens();
        return Promise.reject(error);
    })
}; 