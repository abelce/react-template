/**
 * 这里处理http请求错误， 比如字段传递错误，或者是token过期，并且可以给出用户提示的错误，
 */

const errMap = {
    400: {
        'session is expired': function () {
            if (location.pathname !== '/login') {
                window.location.href = "/login";
            }
        },
        'password is incorrect': function() {
            Message.error('密码错误');
        }
    },
    401: {
        'UNAUTHORIZED': function () {
            window.location.href = "/login";
        }
    },
    

}

//该函数主要用于请求出现错误时catch的回调
export default function handleError(err) {
    const {
        response: {
            status,
            data: {
                errors
            }
        }
    } = err;
    const item = errMap[status];
    if (item) {
        const fn = item[errors[0]['detail']];
        if (typeof fn === 'function') {
            fn();
        }
    }
}