import React from 'react';
import PaymentMethod from './components/paymentMethod';

class User extends React.Component {

    componentDidMount () {
        // throw Error('test');
        const sc = document.createElement('script');
        sc.src= './a.js';
        document.querySelector('body').appendChild(sc);
    }

    render() {
        return <div>
            <PaymentMethod />
        </div>
    }
}

export default User;