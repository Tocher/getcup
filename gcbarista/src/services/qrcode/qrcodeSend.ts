import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import {Api} from 'src/api/Api';
import {Error, QrResponseSchema} from 'src/schema/global';

export interface qrcodeSendOptions {
    hash: string;
}

interface qrcodeSendResponse {
    body: QrResponseSchema | string;
}

export const qrcodeSend = createAsyncService<qrcodeSendOptions>(({hash}, {getState, dispatch, setState}) => {
    let state = getState();

    return Api.qrcodeSend(state.auth.id, hash)
        .then((response: qrcodeSendResponse) => {
            state = getState();

            if (response.body !== 'error' && typeof response.body === 'object') {
                setState({
                    ...state,
                    qr: {
                        time: Date.now(),
                        togo: true, // с собой/на месте (@TODO перенести в бэк)
                        ...response.body,
                    },
                });
            }
        })
        .catch((error: Error) => {
            console.log('sendQr Error', error);

            setState({
                ...state,
                qr: {
                    status: 'error',
                    error: '',
                },
            });
        });
});
