import * as React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import { Auth, Utils } from '../utilities/Functions';

const AppRoute = ({ component: Component, role, ...rest }) => {
    let userLogin = Auth.getELSUser();

    return (
        <Route {...rest} render={props => (
            userLogin !== null ? (
                (role === -1 || userLogin.UserType === role) ? (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                ) : <Redirect to={Utils.homeUrl()} />
            ) : <Redirect to="/login" />
        )} />
    )
}

export default AppRoute
