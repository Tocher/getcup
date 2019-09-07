import React from 'react';
import { createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LoginScreen} from 'src/screen/LoginScreen';
import {StatsScreen} from 'src/screen/StatsScreen';
import {ScanScreen} from 'src/screen/ScanScreen';
import {primaryColor, whiteColor} from 'src/global/variables';

interface tabBarIconOptions {
    tintColor: string | null;
    focused: boolean;
    horizontal: boolean
}

const tabIcon = (type: string, focused: boolean) => {
    return (
        <Icon name={type} size={25} color={focused ? whiteColor : '#555'} />
    );
};

export const MainTabs = createBottomTabNavigator({
    Scan: {
        screen: ScanScreen,
        navigationOptions: {
            header: null,
            tabBarIcon: ({focused}: tabBarIconOptions) => tabIcon('qrcode', focused),
        }
    },
    Stats: {
        screen: StatsScreen,
        navigationOptions: {
            header: null,
            tabBarIcon: ({focused}: tabBarIconOptions) => tabIcon('line-chart', focused),
        }
    },
}, {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showLabel: false,
        activeTintColor: '#333',
        inactiveTintColor: "#ccc",
        inactiveBackgroundColor: '#222',
        activeBackgroundColor: primaryColor,
    }
});

// Manifest of possible screens
export const PrimaryNav = createSwitchNavigator({
    Authenticated: {
        screen: MainTabs,
        navigationOptions: {
            header: null
        }
    },
    Auth: {
        screen: LoginScreen,
        navigationOptions: { title: 'Login' }
    }
}, {
    // Default config for all screens
    initialRouteName: 'Auth',
});
