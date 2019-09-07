import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import * as api from 'src/api';
import {Error} from 'src/schema/global';

export const getQrcode = createAsyncService<any>(async (empty, {getState, dispatch, setState}) => {
    let state = getState();

    setState({
        ...state,
        qrcode: {
            ...state.qrcode,
            loading: true
        }
    }, 'getQrcode');

    let {auth, products} = state;

    let {id, userId} = auth && auth.serverToken;
    let productId = products.current;

    api.getQrcode(id, {
            productId: productId,
            userId: userId,
            userToken: id
        })
        .then(data => {
            let state = getState();

            setState({
                ...state,
                qrcode: {
                    ...state.qrcode,
                    loading: false,
                    hash: data.body,
                }
            }, 'getQrcode');
        })
        .catch((error: Error) => {
            let state = getState();

            setState({
                ...state,
                qrcode: {
                    ...state.qrcode,
                    loading: false,
                    error,
                }
            }, 'getQrcode');
        });
});
