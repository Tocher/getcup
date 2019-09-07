import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {createAppContainer, NavigationProp} from 'react-navigation';
import configureStore from './store';
import {PrimaryNav} from 'src/navigation/PrimaryNav';
import NavigationService from 'src/navigation/NavigationService';
import {State} from 'src/schema/global';
import {StatusBar, View} from 'react-native';
import codePush from "react-native-code-push";
import {updateCurrentScreen} from 'src/services/navigation/updateCurrentScreen';

const store = configureStore();
const AppNavigatorContainer = createAppContainer(PrimaryNav);

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route.routeName;
}

class App extends PureComponent {
    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 20,
                backgroundColor: '#222',
            }}>
                <StatusBar
                    barStyle="light-content"
                />
                <Provider store={store}>
                    <AppNavigatorContainer
                        onNavigationStateChange={(prevState, currentState, action) => {
                            const currentScreen = getActiveRouteName(currentState);
                            const prevScreen = getActiveRouteName(prevState);

                            if (prevScreen !== currentScreen) {
                                // the line below uses the Google Analytics tracker
                                // change the tracker here to use other Mobile analytics SDK.
                                //tracker.trackScreenView(currentScreen);
                                store.dispatch(updateCurrentScreen(currentScreen) as any);
                            }
                        }}
                        ref={(navigatorRef: NavigationProp<State>) => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </Provider>
            </View>
        );
    }
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

export const AppRoot =  codePush(codePushOptions)(App);
