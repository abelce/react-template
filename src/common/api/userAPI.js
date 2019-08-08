import http from '@common/utils/http';

// get user infomation by id
export function getUser(userID) {
    return http(`/user/${userID}`);
}