import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import {getAllQrcodes, getProducts} from 'src/api/Api';

export const getStats = createAsyncService<object>(async (data, {getState, dispatch, setState}) => {
    let state = getState();
    let token = state.auth.id;

    setState({
        ...state,
        stats: {
            ...state.stats,
            _loading: true,
        }
    });

    getAllQrcodes(token).then((data) => {
       if (data.body) {
           state = getState();

           setState({
               ...state,
               stats: {
                   ...state.stats,
                   _loading: false,
                   results: data.body,
               },
           });
       }
    });

    state = getState();
    setState({
        ...state,
        products: {
            ...state.products,
            _loading: true,
        }
    });

    getProducts(token).then((data) => {
        if (data.body) {
            state = getState();

            setState({
                ...state,
                products: {
                    ...state.products,
                    _loading: false,
                    results: data.body,
                },
            })
        }
    });
});
