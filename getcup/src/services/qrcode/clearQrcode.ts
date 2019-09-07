import {createService} from 'src/services/createService/createService';

export const clearQrcode = createService<any>((state, data) => {
    return {
        ...state,
        qrcode: {
            hash: null,
            loading: false,
            checking: false,
            error: null
        }
    }
});
