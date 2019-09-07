import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import {Error} from 'src/schema/global';
import * as api from 'src/api';

export const getProducts = createAsyncService<any>(async (empty, {getState, dispatch, setState}) => {
    let state = getState();

    setState({
        ...state,
        products: {
            ...state.products,
            loading: true,
        }
    }, 'getProducts');

    let token = state.auth && state.auth.serverToken.id;

    api.getProducts(token)
        .then(data => {
            state = getState();

            setState({
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    data: data.body,
                }
            }, 'getProducts');
        })
        .catch((error: Error) => {
            state = getState();

            setState({
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    error,
                }
            }, 'getProducts');
        });
});
