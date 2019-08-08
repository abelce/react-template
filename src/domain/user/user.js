import {User} from '@common/constants';

class User {
    constructor(name, phone, email, type) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.type = type;
    }

    isAdmin() {
        return this.type === User.USER_TYPE_ADMIN;
    }
}

export default User;