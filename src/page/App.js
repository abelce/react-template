import '@common/errors/index.js'
import React from 'react';
import ReactDOM from 'react-dom';
import '@common/assets/stylesheet/index.scss'
import User from './user/index.jsx';

function render() {
    ReactDOM.render(<User/>, document.getElementById('app'));
}

render();