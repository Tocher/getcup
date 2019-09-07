import {createBottomTabNavigator, NavigationActions} from 'react-navigation';
import CustomIcon from 'src/components/Icon';
import React from 'react';

import * as variables from 'src/assets/styles/variables';

import tab1 from './tab1';
import tab2 from './tab2';
import tab3 from './tab3';

const tabIcon = (type: string, focused: boolean) => {
    return <CustomIcon
        height={30}
        fill={focused ? variables.primaryColor : variables.defaultIconColor}
        stroke={focused ? variables.primaryColor : variables.defaultIconColor}
        name={type}
    />;
};

interface tabBarIconOptions {
    tintColor: string | null;
    focused: boolean;
    horizontal: boolean
}

export const MainTabs = createBottomTabNavigator({
    TabOne: {
        screen: tab1,
        navigationOptions: {
            header: null,
            tabBarIcon: ({focused}: tabBarIconOptions) => tabIcon('Map', focused),
            tabBarOnPress: ({navigation, defaultHandler}) => {
                let parent = navigation.dangerouslyGetParent();

                if (parent && parent.state.key === 'Authenticated') {
                    parent.state.routes.forEach((route) => {
                        if (route.key === 'TabTwo' && route.index > 0) {
                            navigation.dispatch(NavigationActions.navigate({routeName: 'CoffeeTab'}));
                        }
                    });
                }

                defaultHandler();
            },
        }
    },
    TabTwo: {
        screen: tab2,
        navigationOptions: {
            tabBarIcon: ({focused}: tabBarIconOptions) => tabIcon('Cup', focused),
        }
    },
    TabThree: {
        screen: tab3,
        navigationOptions: {
            tabBarIcon: ({focused}: tabBarIconOptions) => tabIcon('Profile', focused),
        }
    }
}, {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showLabel: false,
        activeTintColor: variables.primaryColor,
        inactiveTintColor: "#ccc",
    }
});
