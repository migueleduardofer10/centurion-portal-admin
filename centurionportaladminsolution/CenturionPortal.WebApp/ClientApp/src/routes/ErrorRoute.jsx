import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/shared/Layout';

const AppRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            <Layout isFullPage={true}>
                <Component {...props} />
            </Layout>
        )} />
    )
}

export default AppRoute
