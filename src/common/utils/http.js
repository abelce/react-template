import axios from 'axios';

const http = axios.create({
    baseURL: 'https://expanle.com/v1',
    timeout: 1000,
    headers: {
        'content-type': 'application/json'
    }
})

http.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default http;