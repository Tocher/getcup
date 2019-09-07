import {createService} from 'src/services/createService/createService';

export const chooseProductPlace = createService<string>((state, place) => {
    return {
        ...state,
        products: {
            ...state.products,
            currentPlace: place,
        }
    }
});
