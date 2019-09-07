import React, {Component} from 'react';
import {Text, View, Animated, Easing, Dimensions} from 'react-native';
import {connect} from 'src/redux/connect';

import * as styleVars from 'src/assets/styles/variables';
import styles from './styles';

import SocialButton from 'src/components/SocialButton';
import Spinner from 'src/components/Spinner';
import {checkLogin} from 'src/services/auth/checkLogin';
import {UnpackedConnect} from 'src/redux/redux';
import {State} from 'src/schema/global';
import {login} from 'src/services/auth/login';

const window = Dimensions.get('window');

function getAnim(val, delay) {
    return Animated.timing(
        val,
        {
            toValue: 1,
            duration: 500,
            easing: Easing.easeInEaseOut,
            delay: delay || 0
        }
    );
}

interface Internal {
    checkOnStartUp?: boolean;
    checking?: boolean;
}

interface LoginProps {
}

function stateToProps(state: State): Internal {
    const {auth} = state;
    const checkOnStartUp = auth && auth.checkOnStartUp;

    return {
        checkOnStartUp,
        checking: auth && auth.checking || checkOnStartUp,
    }
}

class LoginInternal extends Component<LoginProps & Internal & UnpackedConnect> {
    constructor(props) {
        super(props);

        this.state = {
            translateValue: new Animated.Value(0),
            bgTop: new Animated.Value(0),
            titleTop: new Animated.Value(0),
            formTop: new Animated.Value(0)
        };
    }

    componentDidMount() {
        const {dispatch, checkOnStartUp} = this.props;

        if (checkOnStartUp) {
            dispatch(checkLogin({}));
        }
    }

    auth = (type) => {
        this.props.dispatch(login(type));
    };

    render() {
        const {checking} = this.props;

        // First set up animation
        const backgroundAnimation = Animated.loop(
            Animated.timing(
                this.state.translateValue,
                {
                    toValue: 10,
                    duration: 2000,
                    easing: Easing.linear
                }
            )
        );
        backgroundAnimation.start();

        const bgAnimation = getAnim(this.state.bgTop);
        const titleAnimation = getAnim(this.state.titleTop, 100);
        const formAnimation = getAnim(this.state.formTop, 200);

        if (!checking) {
            backgroundAnimation.stop();
            bgAnimation.start();
            titleAnimation.start();
            formAnimation.start();
        }

        // Second interpolate beginning and end values (in this case 0 and 1)
        const translate = this.state.translateValue.interpolate({
            inputRange: [0, 1, 4, 5, 6, 9, 10],
            outputRange: [-15, -12, 12, 15, 12, -12, -15]
        });

        const bgTopY = this.state.bgTop.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -window.height * 0.3]
        });
        const titleTop = this.state.titleTop.interpolate({
            inputRange: [0, 1],
            outputRange: [window.height * 0.7, window.height * 0.4]
        });
        const formTop = this.state.formTop.interpolate({
            inputRange: [0, 1],
            outputRange: [window.height * 0.6, window.height * 0.1]
        });

        return (
            <View style={styles.container}>
                {checking && (<Spinner/>)}
                <View style={styles.bgContainer}>
                    <Animated.Image
                        style={[
                            styles.bgImage,
                            {transform: [{translateX: translate}]},
                            {marginTop: bgTopY}
                        ]}
                        source={require('src/assets/images/pattern5.png')}
                    />
                </View>
                <Animated.View style={[
                    styles.formContainer,
                    {top: titleTop},
                    {height: '100%'},
                ]}>
                    <Text style={styles.title}>GetCup</Text>
                    <Animated.View style={[
                        styles.form,
                        {top: formTop}
                    ]}>
                        <SocialButton
                            onClick={() => this.auth('vk')}
                            text="Войти через Вконтакте"
                            color={styleVars.socialButtonVKColor}
                            type="vk"
                        />
                        <SocialButton
                            onClick={() => this.auth('fb')}
                            text="Войти через Facebook"
                            color={styleVars.socialButtonFBColor}
                            type="facebook"
                        />
                        <Text style={styles.withoutReg}>Продолжить без регистрации</Text>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

export const Login = connect<LoginProps>(stateToProps)(LoginInternal);
