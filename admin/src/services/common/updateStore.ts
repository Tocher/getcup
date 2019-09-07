import {createService} from 'services/createService/createService';

export const updateStore = createService<Dict>(function updateStore(state, payload) {
    return {
        ...state,
        ...payload,
    };
});
