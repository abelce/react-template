import { Store } from 'flux/utils';
import AppDispatcher from 'AppDispatcher';
import { GET_USER } from '@common/constants/user';
import User from '@domain/user';

class UserStore extends Store {
    constructor() {
        super(AppDispatcher);
        this.user = null;
    }

    __emitChange(data) {
        const {type, payload} = data;
        switch(type) {
            case GET_USER:
                this.user = new User(...payload);
                this.__emitChange();
                break;
        }
    }

    get current() {
        return this.user;
    }
}

export default new UserStore();