import http from '@common/utils/http';

export function getUserAPI() {
    return http({
        url: `/users`,
        method: 'get',
    });
}

export function loginAPI(data) {
    return http({
        method: 'post',
        url: '/auth',
        data: data,
    })
}

export function changePasswordAPI(data) {
    return http({
        method: 'post',
        url:'/users/changePassword',
        data: data,
    })
}

export function registryAPI(data) {
    return ({
        method: 'post',
        utl: '/registry',
        data,
    })
}