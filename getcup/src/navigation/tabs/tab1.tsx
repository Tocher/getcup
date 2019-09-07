import {createStackNavigator} from 'react-navigation';

import {Map} from 'src/containers/Tab1/Map';
import {PlaceDetails} from 'src/containers/Tab1/PlaceDetails';

const hiddenTabBars: string[] = [
    'PlaceDetails',
];

export default createStackNavigator({
    SubTab1: {
        screen: Map,
        navigationOptions: {
            header: null,
        },
    },
    PlaceDetails: {
        screen: PlaceDetails,
        navigationOptions: {
            header: null,
            gesturesEnabled: true,
        },
    },
}, {
    navigationOptions: ({navigation}) => {
        let state = navigation.state;
        let tabBarVisible = true;

        if (hiddenTabBars.includes(state.routes[state.index].routeName)) {
            tabBarVisible = false;
        }
        return {
            gesturesEnabled: false,
            headerStyle: {
                paddingTop: 0,
            },
            headerTintColor: 'black',
            tabBarVisible,
        };
    },
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
    initialRouteName: 'SubTab1',
});
