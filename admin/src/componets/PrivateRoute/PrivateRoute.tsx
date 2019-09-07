import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';
import {connect} from 'react-redux';
import {State} from 'schema/State/State';
import {isUserAuth} from 'helpers/user/isUserAuth/isUserAuth';

export interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
    routes?: any;
    isPrivate?: boolean;
}

interface Internal {
    isAuth: boolean;
}

function stateToProps(state: State, props: PrivateRouteProps): Internal {
    return {
        isAuth: isUserAuth(state),
    };
}

function PrivateRouteInternal(props: PrivateRouteProps & Internal) {
    let {
        isAuth,
        isPrivate,
        routes,
        component: Component,
    } = props;

    if (isPrivate && !isAuth) {
        return (
            <Route
                render={() => (
                    <Redirect
                        to={{pathname: "/login"}}
                    />
                )}
            />
        );
    }

    return (
        <Route
            render={props => <Component {...props} routes={routes} />}
        />
    );
}

export const PrivateRoute = connect(stateToProps)(PrivateRouteInternal);
