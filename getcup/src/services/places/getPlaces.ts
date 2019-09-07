import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import * as api from 'src/api';

export const getPlaces = createAsyncService<any>(async (empty, {getState, dispatch, setState}) => {
    let state = getState();

    setState({
        ...state,
        places: {
            ...state.places,
            loading: true,
        }
    }, 'getPlaces Loading');

    const token = state.auth && state.auth.serverToken.id;

    api.getPlaces(token)
        .then(data => {
            state = getState();

            setState({
                ...state,
                places: {
                    ...state.places,
                    loading: false,
                    data: data.body,
                }
            }, 'getPlaces Loaded');
        })
        .catch(error => {
            state = getState();

            setState({
                ...state,
                places: {
                    ...state.places,
                    loading: false,
                    error,
                }
            }, 'getPlaces Error');
        });
});
