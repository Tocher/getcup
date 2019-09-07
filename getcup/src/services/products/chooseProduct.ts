import {createService} from 'src/services/createService/createService';

export const chooseProduct = createService<string>((state, productId) => {
    return {
        ...state,
        products: {
            ...state.products,
            current: productId,
        }
    }
});
