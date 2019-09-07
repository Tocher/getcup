import * as api from 'src/api';
import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import NavigationService from 'src/navigation/NavigationService';
import {Error} from 'src/schema/global';
import {logout} from 'src/services/auth/logout';

export interface ServerLoginOptions {
    email: string;
    firstName: string;
}

export const serverLogin = createAsyncService<ServerLoginOptions>(async (auth, {getState, dispatch, setState}) => {
    api
        .login({
            email: auth.email,
            name: auth.firstName,
        })
        .then(token => {
            let state = getState();

            NavigationService.navigate('Authenticated');

            setState({
                ...state,
                auth: {
                    ...state.auth,
                    isServerLoggedIn: true,
                    serverToken: token.body,
                    checking: false,
                    checkOnStartUp: false,
                }
            }, 'serverLogin');
        })
        .catch((error: Error) => {
            let state = getState();

            setState({
                ...state,
                auth: {
                    ...state.auth,
                    checking: false,
                    checkOnStartUp: false
                },
            }, 'serverLogin Fail');

            NavigationService.navigate('Auth');

            console.log('server auth error:', error);

            dispatch(logout({}));
        });
});
