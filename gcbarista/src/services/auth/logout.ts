import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import NavigationService from 'src/navigation/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';

export interface logoutOptions {
}

const AUTH_STORAGE_KEY = 'auth';

async function clearAuth() {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
}

export const logout = createAsyncService<logoutOptions>((data, {getState, dispatch}) => {
    clearAuth();

    NavigationService.navigate('Auth');
});
