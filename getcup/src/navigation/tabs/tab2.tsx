import {createStackNavigator, HeaderBackButton, HeaderBackButtonProps} from 'react-navigation';

import {CoffeeTab} from 'src/containers/Tab2/CoffeeTab/CoffeeTab';
import {Subscriptions} from 'src/containers/Tab2/Subscriptions/Subscriptions';
import {Qrcode} from 'src/containers/Tab2/Qrcode/Qrcode';
import {GetCup} from 'src/containers/Tab2/GetCup/GetCup';
import {GetCupSuccess} from 'src/containers/Tab2/GetCupSuccess/GetCupSuccess';
import {Payment} from 'src/containers/Tab2/Payment/Payment';
import {PaymentSuccess} from 'src/containers/Tab2/PaymentSuccess/PaymentSuccess';
import * as React from 'react';

const hiddenTabBars: string[] = [
    'Qrcode',
    'GetCupSuccess',
    'Payment',
    'PaymentSuccess',
];

export default createStackNavigator({
    CoffeeTab: {
        screen: CoffeeTab,
        navigationOptions: {
            header: null
        },
    },
    Subscriptions: {
        screen: Subscriptions,
    },
    Qrcode: {
        screen: Qrcode,
        navigationOptions: {
            header: null
        },
    },
    GetCup: {
        screen: GetCup,
        navigationOptions: {
            header: null
        },
    },
    GetCupSuccess: {
        screen: GetCupSuccess,
        navigationOptions: {
            header: null
        },
    },
    Payment: {
        screen: Payment,
        navigationOptions: {
            headerLeft: (props: HeaderBackButtonProps) => (
                <HeaderBackButton {...props}  title={'Назад'}/>
            ),
        },
    },
    PaymentSuccess: {
        screen: PaymentSuccess,
        navigationOptions: {
            header: null
        },
    }
}, {
    navigationOptions: ({navigation}) => {
        let state = navigation.state;
        let tabBarVisible = true;

        if (hiddenTabBars.includes(state.routes[state.index].routeName)) {
            tabBarVisible = false
        }
        return {
            gesturesEnabled: false,
            tabBarVisible,
        }
    },
    initialRouteName: 'CoffeeTab',
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
});
