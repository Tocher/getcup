import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import * as api from 'src/api';
import {Error} from 'src/schema/global';

export const getPlaceDetails = createAsyncService<string>(async (id, {getState, dispatch, setState}) => {
    let state = getState();

    setState({
        ...state,
        placeDetails: {
            ...state.placeDetails,
            loading: true
        }
    }, 'getPlaceDetails');

    const token = state.auth.serverToken.id;

    api.getPlaceDetails(token, id)
        .then(data => {
            let state = getState();

            setState({
                ...state,
                placeDetails: {
                    ...state.placeDetails,
                    loading: false,
                    data: data.body,
                }
            }, 'getPlaceDetails');
        })
        .catch((error: Error) => {
            let state = getState();

            setState({
                ...state,
                placeDetails: {
                    ...state.placeDetails,
                    loading: false,
                    error,
                }
            }, 'getPlaceDetails');
        });
});

export const selectPlace = createAsyncService<string>(async (id, {getState, dispatch, setState}) => {
    let state = getState();

    const selectedPlace = state.places.data && state.places.data.find(p => p.id === id);

    if (selectedPlace) {
        return setState({
            ...state,
            placeDetails: {
                ...state.placeDetails,
                data: { ...selectedPlace },
            }
        }, 'selectPlace');
    }

    return getPlaceDetails(id);
});

