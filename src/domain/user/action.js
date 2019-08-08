import {
    USER_GET
} from '@common/constants/user';
import Dispatcher from '@common/utils/AppDispatcher';
import {
    getUser
} from '@common/api/userAPI';

// get user
function getUser(userID) {
    getUser(userID)
        .then(function (data) {
            Dispatcher.dispatch({
                type: USER_GET,
                payload: data,
            })
        })
}

export default {
    getUser,
};