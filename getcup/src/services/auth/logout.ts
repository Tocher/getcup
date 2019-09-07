import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import AsyncStorage from '@react-native-community/async-storage';
import VKLogin from 'react-native-vkontakte-login';
import {LoginManager} from 'react-native-fbsdk';
import {initialState} from 'src/redux/initialState';
import NavigationService from 'src/navigation/NavigationService';

async function logoutStorage() {
    try {
        await AsyncStorage.removeItem('auth');
    } catch (error) {
        console.log(`AsyncStorage remove item error: ${error}`);
    }
}

export const logout = createAsyncService<any>(async (empty, {getState, setState}) => {
    let state = getState();

    switch (state.auth && state.auth.authType) {
        case 'vk':
            VKLogin.logout()
                .then(() => {
                })
                .catch(error => {
                    new Error(error);
                });
            break;
        case 'fb':
            LoginManager.logOut();
            break;
    }

    // TODO может не совсем прям начало
    // может конфликтовать с routes в стейте
    NavigationService.navigate('Auth');
    setState({
        ...initialState,
        auth: {
            ...initialState.auth,
            checkOnStartUp: false,
        }
    });
    logoutStorage();
});
