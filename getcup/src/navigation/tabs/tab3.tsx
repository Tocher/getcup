import { createStackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';

import {Profile} from 'src/containers/Tab3/Profile/Profile';
import {AboutApp} from 'src/containers/Tab3/AboutApp/AboutApp';

export default createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null
        },
    },
    AboutApp: {
        screen: AboutApp,
        navigationOptions: {
            header: null
        },
    }
}, {
    navigationOptions: () => ({
        gesturesEnabled: false
    }),
    transitionConfig: () => ({
        transitionSpec: {
            duration: 0,
            timing: Animated.timing,
            easing: Easing.step0,
        },
    }),
    initialRouteName: 'Profile',
});
