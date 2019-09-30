import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
const Users = React.lazy(() => import('./user'));

class Routes extends React.Component {

    componentDidMount() {}

    render() {
        return <React.Suspense fallback={<div>loading...</div>}>
            <Switch>
                <Route exact={true} path="/" component={Users}/>
            </Switch>
        </React.Suspense>
    }
}

export default process.env.NODE_ENV === 'development' ? hot(module)(Routes): Routes;