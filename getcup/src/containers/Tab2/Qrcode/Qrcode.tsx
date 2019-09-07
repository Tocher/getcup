import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';

import Button from 'src/components/Button';
import Wrapper from 'src/components/Wrapper';
import Spinner from 'src/components/Spinner';
import {connect} from 'src/redux/connect';
import * as variables from 'src/assets/styles/variables';
import NavigationService from 'src/navigation/NavigationService';
import {UnpackedConnect} from 'src/redux/redux';
import {State} from 'src/schema/global';
import styles from './styles';

import {clearQrcode} from 'src/services/qrcode/clearQrcode';
import {getQrcode} from 'src/services/qrcode/getQrcode';
import {checkQrcode} from 'src/services/qrcode/checkQrcode';

interface Internal {
    qrcode: object;
    products: object;
}

function stateToProps(state: State): Internal {
    return {
        qrcode: state.qrcode,
        products: state.products
    };
}

class QrcodeInternal extends PureComponent<Internal & UnpackedConnect> {
    static navigationOptions = () => ({
        tabBarVisible: false,
    });
    private timerId: number | undefined;
    private didFocusSubscription: object | undefined;
    private didBlurSubscription: object | undefined;

    onQrcodeClick() {
        NavigationService.navigate('GetCupSuccess');
    }

    onBackClick() {
        NavigationService.navigate('GetCup');
    }

    componentDidMount() {
        const {dispatch, navigation} = this.props;

        if (this.timerId) {
            clearTimeout(this.timerId);
        }

        this.didFocusSubscription = navigation.addListener('didFocus', () => {
            dispatch(getQrcode({}));
            this.timerId = setTimeout(() => {
                dispatch(checkQrcode({}));
            }, 4000);
        });
        this.didBlurSubscription = navigation.addListener('didBlur', () => {
            if (this.timerId) {
                clearTimeout(this.timerId);
            }
            dispatch(clearQrcode({}));
        });
    }

    componentWillUnmount() {
        const {dispatch} = this.props;

        if (this.didFocusSubscription) {
            this.didFocusSubscription.remove();
        }
        if (this.didBlurSubscription) {
            this.didBlurSubscription.remove();
        }

        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        dispatch(clearQrcode({}));
    }

    render() {
        const {qrcode, products} = this.props;

        const currentProduct = products.data.filter((product) => {
            return product.id === products.current;
        })[0];

        return (
            <Wrapper>
                { (qrcode.loading || !qrcode.hash) && <Spinner/> }
                <Text style={styles.title}>Покажите код баристе</Text>
                <View style={styles.contentContainer}>
                    <View style={styles.qrContainer}>
                        <TouchableOpacity
                            onPress={() => this.onQrcodeClick()}
                        >
                            { qrcode.hash && (
                                <QRCode
                                    value={qrcode.hash}
                                    size={230}
                                    color={variables.primaryColor}
                                    backgroundColor='white'
                                />
                            )}
                        </TouchableOpacity>
                        <Text style={styles.subTitle}>{currentProduct.title}</Text>
                        <Text style={styles.text}>{products.currentPlace}</Text>
                    </View>
                    <Button
                        onClick={this.onBackClick}
                        color={variables.primaryColor}
                        borderColor={variables.primaryColor}
                    >ВЕРНУТЬСЯ</Button>
                </View>
            </Wrapper>
        );
    }
}

export const Qrcode = connect(stateToProps)(QrcodeInternal);
