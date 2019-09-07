import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import {Login} from 'src/containers/Login/Login';
import {MainTabs} from './tabs';

// Manifest of possible screens
export const PrimaryNav = createSwitchNavigator({
    Authenticated: {
        screen: MainTabs,
        navigationOptions: {
            header: null
        }
    },
    Auth: {
        screen: Login,
        navigationOptions: { title: 'Login' }
    }
}, {
    // Default config for all screens
    initialRouteName: 'Auth',
});
