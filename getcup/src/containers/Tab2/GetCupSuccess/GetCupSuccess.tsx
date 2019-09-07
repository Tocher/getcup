import React, {Fragment, PureComponent} from 'react';
import {View, Image, Text} from 'react-native';

import Button from 'src/components/Button';
import {CupsCounter} from 'src/components/CupsCounter/CupsCounter';
import Wrapper from 'src/components/Wrapper';
import {connect} from 'src/redux/connect';
import {UnpackedConnect} from 'src/redux/redux';
import {State} from 'src/schema/global';
import NavigationService from 'src/navigation/NavigationService';

import * as variables from 'src/assets/styles/variables';
import styles, {colors} from './styles';

interface Internal {}

function stateToProps(state: State): Internal {
    return {
        subscription: state.subscription,
    };
}

class GetCupSuccessInternal extends PureComponent<Internal & UnpackedConnect> {
    static navigationOptions = ({navigation}) => ({
        tabBarVisible: false,
    });

    onThxClick() {
        NavigationService.navigate('CoffeeTab');
        NavigationService.navigate('TabOne');
    }

    onMoreClick() {
        NavigationService.navigate('GetCup');
    }

    onBuyClick() {
        NavigationService.navigate('CoffeeTab');
    }

    render() {
        const {subscription} = this.props;

        return (
            <Wrapper>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.topImage}
                        source={require('src/assets/images/pattern5.png')}
                    />
                </View>
                <View style={styles.contentContainer}>
                    {subscription && subscription.data && subscription.data.cups ? (
                        <Fragment>
                            <View style={styles.successContainer}>
                                <CupsCounter />
                                <Text style={styles.title}>{'Приятного\nкофепития!'}</Text>
                                <Text style={styles.text}>Осторожно, не обожгитесь</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onClick={this.onThxClick}
                                    bgColor={variables.primaryColor}
                                    color='#fff'
                                >СПАСИБО</Button>
                                <Button
                                    borderColor={variables.primaryColor}
                                    bgColor={variables.whiteTransparentColor}
                                    onClick={this.onMoreClick}
                                    color={variables.primaryColor}
                                >ВЗЯТЬ ЕЩЁ ЧАШКУ</Button>
                            </View>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <View style={styles.successContainer}>
                                <Text style={styles.text}>У Вас не осталось чашек</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onClick={this.onBuyClick}
                                    bgColor={variables.primaryColor}
                                    color='#fff'
                                >КУПИТЬ АБОНЕМЕНТ</Button>
                                <Button
                                    borderColor={variables.primaryColor}
                                    bgColor={variables.whiteTransparentColor}
                                    onClick={this.onThxClick}
                                    color={variables.primaryColor}
                                >ВЕРНУТЬСЯ НА ГЛАВНУЮ</Button>
                            </View>
                        </Fragment>
                    )}
                </View>
            </Wrapper>
        );
    }
}

export const GetCupSuccess = connect(stateToProps)(GetCupSuccessInternal);
