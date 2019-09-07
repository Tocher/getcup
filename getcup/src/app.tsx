import React, {PureComponent} from 'react';
import {createAppContainer, NavigationProp} from 'react-navigation';
import {Provider} from 'react-redux';
import {View} from 'react-native';
import configureStore from './store';
import {styles} from './styles';
import {PrimaryNav} from 'src/navigation/PrimaryNav';
import NavigationService from 'src/navigation/NavigationService';
import {State} from 'src/schema/global';
import codePush from 'react-native-code-push';

const store = configureStore();

const AppNavigatorContainer = createAppContainer(PrimaryNav);

class App extends PureComponent {
    // codePushStatusDidChange(status) {
    //     switch(status) {
    //         case codePush.SyncStatus.CHECKING_FOR_UPDATE:
    //             console.log("Checking for updates.");
    //             break;
    //         case codePush.SyncStatus.DOWNLOADING_PACKAGE:
    //             console.log("Downloading package.");
    //             break;
    //         case codePush.SyncStatus.INSTALLING_UPDATE:
    //             console.log("Installing update.");
    //             break;
    //         case codePush.SyncStatus.UP_TO_DATE:
    //             console.log("Up-to-date.");
    //             break;
    //         case codePush.SyncStatus.UPDATE_INSTALLED:
    //             console.log("Update installed.");
    //             break;
    //     }
    // }
    //
    // codePushDownloadDidProgress(progress) {
    //     console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
    // }

    render() {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    <AppNavigatorContainer
                        ref={(navigatorRef: NavigationProp<State>) => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </Provider>
            </View>
        );
    }
}

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

export const AppRoot = codePush(codePushOptions)(App);
