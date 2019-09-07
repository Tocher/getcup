import AsyncStorage from '@react-native-community/async-storage';
import {AuthSchema} from 'src/schema/global';

interface Auth {
    /**
     * String token for use in request parameters
     */
    access_token: string | null;
    /**
     * User email, or null, if permission was not given
     */
    email: string | null;
    /**
     * **Android only** If user sets "Always use HTTPS" setting in his profile, it will be true
     */
    https_required?: boolean;
    /**
     * User secret to sign requests (if nohttps used)
     */
    secret: string | null;
    /**
     * Current user id for this token
     */
    user_id: string | null;
    /**
     * Time when token expires
     */
    expires_in?: number;

    authType?: 'vk' | 'fb',
}

export const AUTH_STORAGE_KEY = 'auth';

export async function saveAuth(auth: AuthSchema) {
    try {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } catch (error) {
        if (__DEV__) {
            console.error(error);
        }
    }
}
