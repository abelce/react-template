import React from 'React';
import Style from './style.scss';

const methodes = [
    {
        id: '1',
        label: '支付宝',
    },
    {
        id: '2',
        label: '微信',
    },
    {
        id: '3',
        label: 'paypal'
    }
];

export default function PaymentMethod() {
    return <ul className={Style.payemtMethod}>
        {methodes.map(method => <li key={method.id}>{method.label}</li>)}
    </ul>
}