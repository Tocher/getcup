import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import {serverLogin} from 'src/services/auth/serverLogin';
import {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import VKLogin from 'react-native-vkontakte-login';
import {getAvatar} from 'src/services/auth/getAvatar';
import {saveAuth} from 'src/helpers/saveAuth';
import {Dict} from 'src/schema/global';

export const login = createAsyncService<string>(async (social, {getState, dispatch, setState}) => {
    let permissions: string[];

    switch (social) {
        case 'vk':
            permissions = ['friends', 'email'];

            console.log('a');

            VKLogin.login(permissions)
                .then(async (auth) => {
                    console.log('b', auth);

                    let state = getState();
                    let normalizedAuth = {
                        ...state.auth,
                        accessToken: auth.access_token,
                        email: auth.email,
                        authType: 'vk',
                        userId: auth.user_id,
                        isLoggedIn: true,
                        checking: true,
                    } as any;

                    setState({
                        ...state,
                        auth: normalizedAuth,
                    });

                    // get user first name
                    await dispatch(getAvatar('vk'));

                    let authData = getState().auth;

                    if (authData && authData.email && authData.firstName) {
                        dispatch(serverLogin({
                            email: authData.email,
                            firstName: authData.firstName,
                        }));
                    } else {
                        // no email?
                        // no name?
                    }

                    if (authData) {
                        saveAuth(authData);
                    }
                })
                .catch(error => {
                    // внутри библиотеки vklogin стоит обработка ошибок
                    // поэтому к нам попадает только `VK Cancel`
                    // надо будет убрать там обработку или улучшить
                    // чтобы мы сами могли сообщить что нет инета
                    switch (error.message) {
                        case 'net::ERR_NAME_NOT_RESOLVED':
                            // нет интернета/wifi
                            break;
                    }

                    let state = getState();

                    setState({
                        ...state,
                        auth: false,
                    });

                    console.log('VK', error);
                });
            break;
        case 'fb':
            permissions = ["public_profile", "email"];

            LoginManager
                .logInWithPermissions(permissions) // logInWithPermissions for fbsdk 1.0.0+
                .then((auth) => {
                    let state = getState();

                    if (auth.isCancelled) {
                        setState({
                            ...state,
                            auth: undefined,
                        });
                    } else {
                        AccessToken.getCurrentAccessToken().then(
                            (value) => {
                                const infoRequest = new GraphRequest(
                                    '/me?fields=name,first_name,last_name,email,picture',
                                    null,
                                    (error?: Dict, result?: Dict) => {
                                        // @TODO facebook error

                                        if (result) {
                                            let state = getState();
                                            let normalizedAuth = {
                                                ...state.auth,
                                                email: result.email,
                                                authType: 'fb',
                                                userId: result.id,
                                                isLoggedIn: true,
                                                checking: true,

                                                name: result.name,
                                                firstName: result.first_name,
                                                lastName: result.last_name,

                                                avatar: result.picture.data,
                                            } as any;

                                            setState({
                                                ...state,
                                                auth: normalizedAuth,
                                            });

                                            saveAuth(normalizedAuth);

                                            dispatch(serverLogin({
                                                email: result.email,
                                                firstName: result.first_name,
                                            }));
                                        }
                                    }
                                );
                                // Start the graph request.
                                new GraphRequestManager().addRequest(infoRequest).start();
                            }
                        );
                    }
                },
                error => {
                    // error.message, error.code
                    switch (error.message) {
                        case 'net::ERR_NAME_NOT_RESOLVED':
                            // нет интернета/wifi
                            break;
                    }

                    let state = getState();

                    setState({
                        ...state,
                        auth: false,
                    });
                });
            break;
    }
});
