import * as React from 'react';
import {connect, UnpackedConnect} from 'redux/connect';
import {State} from 'schema/State/State';
import {Redirect, withRouter} from 'react-router-dom';
import {LoginForm} from 'componets/LoginForm/LoginForm';
import {Form} from 'antd';
import {FormComponentProps} from 'antd/es/form';

import './Login.css';
import {isUserAuth} from 'helpers/user/isUserAuth/isUserAuth';
import {checkLogin} from 'services/user/checkLogin';

function formStateToProps(state: State) {
    return {};
}

const LoginFormComponent = connect<any>(formStateToProps)(Form.create<FormComponentProps & UnpackedConnect>({
    name: 'login',
})(LoginForm));

export interface LoginProps {
}

interface Internal {
    isAuth?: boolean;
}

interface ComponentState {

}

function stateToProps(state: State, props: LoginProps): Internal {
    return {
        isAuth: isUserAuth(state),
    };
}

class LoginInternal extends React.Component<LoginProps & Internal & UnpackedConnect, ComponentState> {
    componentDidMount(): void {
        this.props.dispatch(checkLogin({}));
    }

    render() {
        let {isAuth} = this.props;

        return (
            <div className="login">
                {isAuth ? (
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                        }}
                    />
                ) : (
                    <LoginFormComponent/>
                )}
            </div>
        );
    }

}

export const Login = withRouter<any, any>(connect<LoginProps>(stateToProps)(LoginInternal));
