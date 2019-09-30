import {
    USER_GET,
    REGISTRY,
} from '@common/constants/user';
import AppDispatcher from '@common/utils/AppDispatcher';
import {
    getUserAPI,
    registryAPI,
} from '@common/api/userAPI';

export const getUser = function(userID) {
    getUserAPI(userID)
        .then(function (data) {
            AppDispatcher.dispatch({
                type: USER_GET,
                payload: data.data,
            })
        })
}

export const registry = async function(data) {
    const p = await registryAPI(data)
    AppDispatcher.dispatch({
        type: REGISTRY,
        payload: p.data,
    });
}