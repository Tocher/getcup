import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import NavigationService from 'src/navigation/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';

const AUTH_STORAGE_KEY = 'auth';

export const checkLogin = createAsyncService<object>(async (data, {getState, dispatch, setState}) => {
    const value = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

    if (value !== null) {
        let auth = JSON.parse(value);
        let state = getState();

        setState({
            ...state,
            auth,
        });

        NavigationService.navigate('Authenticated');
    }
});
