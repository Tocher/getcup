import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import * as api from 'src/api';

export const getSubscriptionSubTypes = createAsyncService<any>(async (empty, {getState, dispatch, setState}) => {
    let state = getState();

    setState({
        ...state,
        subscriptionSubTypes: {
            ...state.subscriptionSubTypes,
            loading: true,
        },
    });

    let serverToken = state.auth && state.auth.serverToken;
    if (!serverToken) return;
    let {id} = serverToken;

    try {
        let data = await api.getSubscriptionSubTypes(id);

        state = getState();
        setState({
            ...state,
            subscriptionSubTypes: {
                ...state.subscriptionSubTypes,
                data: data.body,
                loading: false,
            },
        });

    } catch (error) {
        console.log('error:', error);
        state = getState();
        setState({
            ...state,
            subscriptionSubTypes: {
                ...state.subscriptionSubTypes,
                loading: false,
                error,
            },
        });
    }
});
