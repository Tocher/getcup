import * as React from 'react';
import {connect, UnpackedConnect} from 'redux/connect';
import {State} from 'schema/State/State';
import {BrowserRouter, Switch} from 'react-router-dom';
import {PrivateRoute} from 'componets/PrivateRoute/PrivateRoute';
import {Login} from 'containers/Login/Login';
import {Dashboard} from 'containers/Dashboard/Dashboard';
import {Users} from 'containers/Users/Users';
import {checkLogin} from 'services/user/checkLogin';
import {isUserCheckedOnStartUp} from 'helpers/user/isUserCheckedOnStartUp/isUserCheckedOnStartUp';
import { Spin } from 'antd';

import './Main.css';

export interface MainProps {

}

interface Internal {
    isChecked?: boolean;
}

function stateToProps(state: State, props: MainProps): Internal {
    let isChecked = isUserCheckedOnStartUp(state);

    return {
        isChecked,
    };
}

const routes = [
    {
        exact: true,
        path: "/",
        component: Login,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/dashboard",
        component: Dashboard,
        isPrivate: true,
        routes: [
            {
                path: "/dashboard/users",
                component: Users
            },
        ]
    },
    {
        component: NotFound,
    }
];

function NotFound() {
    return <h2>NOT FOUND</h2>;
}

class MainInternal extends React.Component<MainProps & Internal & UnpackedConnect> {
    componentDidMount(): void {
        let {isChecked, dispatch} = this.props;

        if (!isChecked) {
            dispatch(checkLogin({}));
        }
    }

    render() {
        let {isChecked} = this.props;

        if (!isChecked) {
            return (
                <div className="main">
                    <Spin size="large" />
                </div>
            );
        }

        return (
            <BrowserRouter>
                <Switch>
                    {routes.map((route, i) => (
                        <PrivateRoute key={i} {...route} />
                    ))}
                </Switch>
            </BrowserRouter>
        );
    }

}

export const Main = connect<MainProps>(stateToProps)(MainInternal);
