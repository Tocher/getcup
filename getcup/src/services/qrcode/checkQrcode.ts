import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import * as api from 'src/api';
import {Error} from 'src/schema/global';
import NavigationService from 'src/navigation/NavigationService';

const CHECK_QRCODE_TIMEOUT = 2000;

export const checkQrcode = createAsyncService<any>(async (empty, {getState, dispatch, setState}) => {
    let state = getState();

    // function getCurrentRouteName (navigationState) {
    //     if (!navigationState || !navigationState.routes) {
    //         return null;
    //     }
    //     const route = navigationState.routes[navigationState.index];
    //     if (route.routes) {
    //         return getCurrentRouteName(route);
    //     }
    //     return route.routeName;
    // }
    //
    // // Если мы ушли с таба qrcode, нужно его очистить и перестать пулить сервер
    // if (getCurrentRouteName(state.nav) !== 'Qrcode') {
    //     dispatch({ type: types.CLEAR_QRCODE });
    //     return;
    // }

    let {auth, qrcode} = state;
    let {id, userId} = auth && auth.serverToken;
    let {checking, hash} = qrcode;

    // Если один пуллинг запущен, второй не нужен :)
    if (checking) return;

    setState({
        ...state,
        qrcode: {
            ...state.qrcode,
            checking: true,
        }
    }, 'checkQrcode');

    api.checkQrcode(id, {
        hash: hash,
        userId: userId,
        userToken: id,
    })
        .then(data => {
            switch (data.body.status) {
                case 'success': {
                    let state = getState();

                    setState({
                        ...state,
                        qrcode: {
                            ...state.qrcode,
                            checking: false,
                        },
                        subscription: {
                            ...state.subscription,
                            data: data.body.subscription,
                            loading: false,
                        },
                    }, 'checkQrcode');

                    NavigationService.navigate('GetCupSuccess');
                    break;
                }
                case 'pending': {
                    let state = getState();

                    setState({
                        ...state,
                        qrcode: {
                            ...state.qrcode,
                            checking: false,
                        }
                    }, 'checkQrcode');

                    setTimeout(() => {
                        dispatch(checkQrcode({}));
                    }, CHECK_QRCODE_TIMEOUT);
                    break;
                }
                default: {
                    let state = getState();

                    console.error('Incorrect qrcode status', data);

                    setState({
                        ...state,
                        qrcode: {
                            ...state.qrcode,
                            checking: false,
                        }
                    }, 'checkQrcode');
                }
            }
        })
        .catch((error: Error) => {
            let state = getState();

            setState({
                ...state,
                qrcode: {
                    ...state.qrcode,
                    checking: false,
                    error,
                }
            }, 'checkQrcode');
        });
});
