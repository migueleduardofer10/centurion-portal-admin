import * as React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import { Auth, Utils } from '../utilities/Functions';

const AppRoute = ({ component: Component, ...rest }) => {
    let userLogin = Auth.getELSUser();

    return (
        <Route {...rest} render={props => (
            userLogin === null ? (
                <Layout isFullPage={true}>
                    <Component {...props} />
                </Layout>
            ) : <Redirect to={Utils.homeUrl()} />
        )} />
    )
}

export default AppRoute
