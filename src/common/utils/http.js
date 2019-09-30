import axios from 'axios';
import errors from '@common/errors/index.js';

export const baseURL = 'http://xxxx.com/v1';

export function httpBase() {
    return axios.create({
        baseURL: baseURL,
        timeout: 10000,
        headers: {
            'content-type': 'application/json',
        }
    })
}

function http (data) {
    const instance = httpBase();
    
    instance.interceptors.response.use(function (response) {
        return response.data;
    }, function (error) {
        errors.handleError(error);
        return Promise.reject(error);
    });

    return instance(data);
}

export default http;