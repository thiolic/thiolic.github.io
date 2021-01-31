import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions/index'

const Checkout = lazy(() => {
    return import('./containers/Checkout/Checkout');
});

const Orders = lazy(() => {
    return import('./containers/Orders/Orders');
});

const Auth = lazy(() => {
    return import('./containers/Auth/Auth');
});

const App = ({ onTryAutoSingup, isAuthenticated }) => {
    useEffect(() => {
        onTryAutoSingup();
    }, [onTryAutoSingup]);

    let routes = (
        <Switch>
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" render={(props) => <Checkout {...props} />} />
                <Route path="/orders" render={(props) => <Orders {...props} />} />
                <Route path="/logout" component={Logout} />
                <Route path="/auth" render={(props) => <Auth {...props} />} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
};

const mapStateToProps = ({ auth: { token } }) => {
    return {
        isAuthenticated: token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSingup: () => dispatch(authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
