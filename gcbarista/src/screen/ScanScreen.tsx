import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {QrResponseSchema, State} from '../schema/global';
import QRCodeScanner, {QrData} from 'react-native-qrcode-scanner';
import {qrcodeSend} from 'src/services/qrcode/qrcodeSend';
import {connect, UnpackedConnect} from 'src/redux/connect';
import {primaryColor} from 'src/global/variables';
import Icon from 'react-native-vector-icons/FontAwesome';
import {clearCurrentOrder} from 'src/services/qrcode/clearCurrentOrder';
import {Button2} from 'src/components/Button2/Button2';
import {NavigationScreenProp} from 'react-navigation';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export interface ScanScreenProps {
    navigation: NavigationScreenProp<State>;
}

interface Internal {
    order?: QrResponseSchema;
}

interface ComponentState {
    focusedScreen: boolean;
}

function stateToProps(state: State): Internal {
    return {
        order: state.qr,
    };
}

const REACTIVATE_TIMEOUT = 5000;

class ScanScreenInternal extends React.Component<ScanScreenProps & Internal & UnpackedConnect, ComponentState> {
    public state: ComponentState = {
        focusedScreen: true,
    };
    private scanner: React.Ref<React.Component> | null = null;

    async onSuccess(e: QrData) {
        let {dispatch} = this.props;

        await dispatch(qrcodeSend({hash: e.data}));
    }

    onOut() {
        let {dispatch} = this.props;

        dispatch(clearCurrentOrder({}));
    }

    componentDidMount() {
        const { navigation } = this.props;

        navigation.addListener('willFocus', () => {
            this.setState({focusedScreen: true});
        });
        navigation.addListener('willBlur', () => {
            this.setState({focusedScreen: false});
        });
    }

    // react navigation feature!
    //componentDidAppear

    render() {
        let {order} = this.props;
        let {focusedScreen} = this.state;
        let orderDate;
        let orderDateParsed;

        if (order && order.time) {
            orderDate = new Date(order.time);

            let minutes = orderDate.getMinutes() > 10 ? orderDate.getMinutes() : `0${orderDate.getMinutes()}`;

            orderDateParsed = `${orderDate.getHours()}:${minutes}`;
        }

        if (!focusedScreen) {
            return <View />
        }

        //@TODO
        // if (hasCameraPermission === null) {
        //     return <View />;
        // } else if (hasCameraPermission === false) {
        //     return <Text>No access to camera</Text>;
        // } else if (focusedScreen){
        //     return (this.cameraView());
        // } else {
        //     return <View />;
        // }

        return (
            <React.Fragment>
                <QRCodeScanner
                    ref={(ref) => this.scanner = ref}
                    reactivate={true}
                    reactivateTimeout={REACTIVATE_TIMEOUT}
                    onRead={this.onSuccess.bind(this)}
                    topContent={
                        <View style={{
                            flex: 1,
                            paddingTop: 20,
                        }}>
                            <Text style={styles.centerText}>Оплата пройдет сразу как</Text>
                            <Text style={styles.centerText}>просканируете <Text style={styles.textBold}>QR код</Text></Text>
                        </View>
                    }
                    bottomContent={
                        <View style={{
                            flex: 1,
                            paddingTop: 20,
                        }}>
                            <Text style={styles.centerText}>Улыбнитесь передавая кофе,</Text>
                            <Text style={styles.centerText}>люди приходят за теплом.</Text>
                        </View>
                    }
                    cameraStyle={{
                        width: viewportWidth,
                        height: viewportWidth,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                    cameraProps={{ratio: "1:1"}}
                    vibrate={false} // Only on android bug (add to permissions)
                />
                {order && (
                    <View
                        style={{
                            flex: 1,
                            width: viewportWidth,
                            height: viewportHeight - 40,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                paddingTop: 15,
                                justifyContent: 'center',
                                //alignItems: 'center',
                                width: viewportWidth - 100,
                                backgroundColor: '#fff',
                                borderRadius: 5,
                            }}
                        >
                            <View
                                style={{
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    paddingBottom: 10,
                                }}
                            >
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                                    {order.product} <Icon name="coffee" size={20} color={primaryColor} />
                                </Text>
                                {order.customer && order.customer.name || 'Олег' && (
                                    <Text style={{paddingTop: 10}}>
                                        Заказал: <Text style={{fontWeight: 'bold'}}>{order.customer && order.customer.name || 'Олег'}</Text>
                                    </Text>
                                )}
                                {orderDate && (
                                    <Text>
                                        Время заказа: <Text style={{fontWeight: 'bold'}}>{orderDateParsed}</Text>
                                    </Text>
                                )}
                                {order.status === 'success' && (
                                    <View
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <View>
                                            <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>С собой</Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Text>Оплата: </Text>
                                            <Icon name="check" size={30} color='#1c9f75' />
                                        </View>
                                    </View>
                                )}

                                {order.status === 'error' && (
                                    <View
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Text>Ошибюка: </Text>
                                            <Icon name="error" size={30} color='#1c9f75' />
                                        </View>
                                    </View>
                                )}
                            </View>
                            <Button2
                                text='Закрыть'
                                onClick={this.onOut.bind(this)}
                                width={viewportWidth - 100}
                                disableTopRadius
                            />
                        </View>
                    </View>
                )}
            </React.Fragment>
        );
    }
}

export const ScanScreen = connect<ScanScreenProps>(stateToProps)(ScanScreenInternal);

const styles = StyleSheet.create({
    centerText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
    },
    textBold: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        color: '#fff',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});
