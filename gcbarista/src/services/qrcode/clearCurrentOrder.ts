import {createService} from 'src/services/createService/createService';

export const clearCurrentOrder = createService(function clearCurrentOrder(state, data) {
    return {
        ...state,
        qr: undefined,
    }
});
