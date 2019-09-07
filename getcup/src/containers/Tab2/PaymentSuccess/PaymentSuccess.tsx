import React, {PureComponent} from 'react';
import {View, Image, Text} from 'react-native';

import Button from 'src/components/Button';
import Wrapper from 'src/components/Wrapper';
import CupsCounter from 'src/components/CupsCounter/CupsCounter';
import {connect} from 'src/redux/connect';

import * as variables from 'src/assets/styles/variables';
import styles from './styles';
import NavigationService from 'src/navigation/NavigationService';
import {State} from 'src/schema/global';
import {UnpackedConnect} from 'src/redux/redux';

interface Internal {}

function stateToProps(state: State): Internal {
    return {
    };
}

class PaymentSuccessInternal extends PureComponent<Internal & UnpackedConnect> {
    onThxClick() {
        NavigationService.navigate('CoffeeTab', {});
        setTimeout(() => NavigationService.navigate('TabOne', {}), 100);
    }

    onMoreClick() {
        NavigationService.navigate('GetCup',{});
    }

    render() {
        return (
            <Wrapper>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.topImage}
                        source={require('src/assets/images/pattern5.png')}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.successContainer}>
                        <CupsCounter />
                        <Text style={styles.title}>{'Приятного\nкофепития!'}</Text>
                        <Text style={styles.text}>Подписка успешно оформлена</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onClick={() => this.onThxClick() }
                            borderColor={variables.primaryColor}
                            bgColor={variables.whiteTransparentColor}
                            color={variables.primaryColor}
                        >ПОСМОТРЕТЬ КОФЕЙНИ</Button>
                        <Button
                            onClick={() => this.onMoreClick() }
                            bgColor={variables.primaryColor}
                            color='#fff'
                        >ВЗЯТЬ ЧАШКУ</Button>
                    </View>
                </View>
            </Wrapper>
        );
    }
}

export const PaymentSuccess = connect(stateToProps)(PaymentSuccessInternal);
