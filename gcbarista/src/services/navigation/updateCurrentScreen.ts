import {createService} from 'src/services/createService/createService';

export const updateCurrentScreen = createService<string>(function clearCurrentOrder(state, screen) {
    return {
        ...state,
        screen,
    }
});
