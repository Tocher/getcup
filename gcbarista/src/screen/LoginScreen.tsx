import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {UnpackedConnect} from 'src/redux/redux';
import {Button2} from 'src/components/Button2/Button2';
import {Input} from 'src/components/Input/Input';
import {login} from 'src/services/auth/login';
import {connect} from 'src/redux/connect';
import {checkLogin} from 'src/services/auth/checkLogin';

import {h1, h2, primaryColor} from 'src/global/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 36,
    },
    containerOnFocus: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 36,
    },
    logo: {
        paddingTop: 64,
        paddingBottom: 48,
    },
    logoOnFocus: {
        paddingTop: 0,
        paddingBottom: 12,
    },
    logoText: {
        fontSize: h1,
        fontWeight: "bold",
        fontFamily: "Arial",
        textAlign: "center",
        color: '#fff',
    },
    subLogoText: {
        fontSize: h2,
        fontWeight: "bold",
        fontFamily: "Arial",
        textAlign: "center",
        color: '#fff',
    },
});

interface LoginScreenProps {

}

interface Internal {

}

interface ComponentState {
    email?: string;
    password?: string;
    hideLogo?: boolean;
    loading?: boolean;
}

function stateToProps() {
    return {};
}

class LoginScreenInternal extends React.PureComponent<LoginScreenProps & Internal & UnpackedConnect, ComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            hideLogo: false,
        };
    }

    componentDidMount() {
        let {dispatch} = this.props;

        dispatch(checkLogin({}));
    }

    onFocus() {
        this.setState({
            hideLogo: true,
        })
    }

    onBlur() {
        this.setState({
            hideLogo: false,
        })
    }

    async onLogin() {
        let {dispatch} = this.props;
        let {email, password} = this.state;

        this.setState({
            loading: true,
        });

        try {
            let response = await dispatch(login({
                email,
                password,
            }));
        } catch (error) {
            this.setState({
                loading: false,
            });

            // @TODO notification error
        }
    }

    render() {
        let {loading} = this.state;

        return (
            <View style={
                this.state.hideLogo ?
                    styles.containerOnFocus :
                    styles.container
            }>
                <View style={
                    this.state.hideLogo ?
                        styles.logoOnFocus :
                        styles.logo
                }>
                    <Text style={styles.logoText}>GetCup</Text>
                    <Text style={styles.subLogoText}>Barista</Text>
                </View>
                <View style={{
                    marginBottom: 24,
                }}>
                    <Input
                        keyboardType="email-address"
                        placeholder='Введите логин'
                        style={{
                            marginBottom: 24,
                        }}
                        onChange={(val) => this.setState({
                            email: val,
                        })}
                        onFocus={this.onFocus.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                    />
                    <Input
                        placeholder='Введите пароль'
                        password
                        onChange={(val) => this.setState({
                            password: val,
                        })}
                        onFocus={this.onFocus.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                    />
                </View>
                {loading ? (
                    <ActivityIndicator
                        color={primaryColor}
                        size={'large'}
                    />
                ) : (
                    <Button2
                        onClick={this.onLogin.bind(this)}
                        text='Варить'
                    />
                )}
            </View>
        );
    }
}

export const LoginScreen = connect<LoginScreenProps>(stateToProps)(LoginScreenInternal);
