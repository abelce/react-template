import Constants from '@common/constants/user';

/**
 * 这里主要将获取到的数据和新建的数据转换成统一的格式
 */
class User {
    constructor(data) {
        this.name = data.name;
        this.phone = data.phone;
        this.email = data.email;
        this.type = data.type;
        this.id = data.id;
        this.status = data.status;
        this.description = data.description;
        this.logoImage = data.logoImage;
        this.address = data.address;
    }
}

export function FormatOperator(data) {
    const {attributes,id,} = data;
    return new User({
        id,
        ...attributes,
    });
    
}

export default User;