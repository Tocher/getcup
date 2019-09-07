import {baristaAuth} from 'src/api/Api';
import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import NavigationService from 'src/navigation/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';

export interface loginOptions {
    email?: string;
    password?: string;
}

const AUTH_STORAGE_KEY = 'auth';

async function saveAuth(auth) {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export const login = createAsyncService<loginOptions>(({email, password}, {getState, setState}) => {
    if (!email || !password) {
        throw new Error('login or password empty');
    }

    baristaAuth({
        email,
        password,
    }).then((data) => {
        NavigationService.navigate('Authenticated');

        let response = data.body;
        let authData = {
            id: response.id,
            userId: response.userId,
            email,
        };

        setState({
            ...getState(),
            auth: authData,
        });

        saveAuth(authData);
        // data.id - token
        // data.ttl - 2 weeks
        // data.userId
        // data.created

    }).catch((error: Error) => {
        console.log(error);

        throw error;
    });
});
