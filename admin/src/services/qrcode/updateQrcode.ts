import {createService} from 'services/createService/createService';

export const updateQrcode = createService<string>(function updateQrcode(state, data) {
    return {
        ...state,
        qrcode: data,
    }
});
