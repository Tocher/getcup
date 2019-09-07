import * as React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import {UnpackedConnect} from 'redux/connect';
import {userLogin} from 'services/user/userLogin';

export class LoginForm extends React.Component<FormComponentProps & UnpackedConnect> {
    handleSubmit = e => {
        e.preventDefault();

        let {form, dispatch} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                dispatch(userLogin({
                    email: values.username,
                    password: values.password,
                }));
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
