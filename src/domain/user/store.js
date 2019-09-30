import { Store } from 'flux/utils';
import AppDispatcher from '@common/utils/AppDispatcher';
import { USER_GET } from '@common/constants/user';
import {FormatOperator} from '@domain/user/user.js'

class UserStore extends Store {
    
    _lastAction = {};

    constructor() {
        super(AppDispatcher);
        this._user = null;
    }

    __onDispatch(_data) {
        const {
            type,
            payload = null,
        } = _data;
        this._lastAction = {
            type,
            payload,
        };
        switch(type) {
            case USER_GET:
                this._user = FormatOperator(payload);
                this.__emitChange();
                break;
            default:
                break;
        }
    }

    get lastAction() {
        return this._lastAction;
    }

    get user () {
        return this._user;
    }

}

export default new UserStore();