import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import AsyncStorage from '@react-native-community/async-storage';
import {serverLogin} from 'src/services/auth/serverLogin';
import {AUTH_STORAGE_KEY, saveAuth} from 'src/helpers/saveAuth';
import {getAvatar} from 'src/services/auth/getAvatar';

export interface CheckLoginOptions {
}

export const checkLogin = createAsyncService<CheckLoginOptions>(async (data, {getState, dispatch, setState}) => {
    const value = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

    if (value !== null) {
        let state = getState();
        let auth = JSON.parse(value);

        setState({
            ...state,
            auth: {
                ...state.auth,
                ...auth,
                isLoggedIn: true,
                checking: true,
            },
        }, 'checkLogin');

        if (auth.authType === 'vk') {
            dispatch(getAvatar('vk'));
        } else if (auth.authType === 'fb') {
            console.log('GET FACEBOOK LOCALSTORAGE', auth);
            // TODO facebook avatar
        }

        console.log('checkLogin', auth);

        dispatch(serverLogin(auth));

        // save in storage
        // if (auth) {
        //     saveAuth(auth);
        // }
    } else {
        let state = getState();

        setState({
            ...state,
            auth: {
                ...state.auth,
                isLoggedIn: false,
                checking: false,
                checkOnStartUp: false,
            },
        }, 'checkLogin false');
    }
});
