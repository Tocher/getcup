import {createService} from 'src/services/createService/createService';
import {Dict} from 'src/schema/global';

export const updateStore = createService<Dict>(function updateStore(state, payload) {
    return {
        ...state,
        ...payload,
    };
});
