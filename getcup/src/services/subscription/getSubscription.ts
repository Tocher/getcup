import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import * as api from 'src/api';
import {Error, Subscription} from 'src/schema/global';
import NavigationService from 'src/navigation/NavigationService';

export const getSubscription = createAsyncService<any>(async (empty, {getState, dispatch, setState}) => {
    let state = getState();

    let serverToken = state.auth && state.auth.serverToken;
    let {userId, id} = serverToken;

    setState({
        ...state,
        subscription: {
            ...state.subscription,
            loading: true,
        }
    }, 'getSubscription Loading');

    api.getUserSubscription(id, userId)
        .then(data => {
            state = getState();

            let subs: Subscription = data.body;

            setState({
                ...state,
                subscription: {
                    ...state.subscription,
                    loading: false,
                    data: subs,
                }
            }, 'getSubscription Loaded');

            if (subs && subs.status === 'pending') {
                NavigationService.navigate('Payment');
            }
        })
        .catch((error: Error) => {
            state = getState();

            setState({
                ...state,
                subscription: {
                    ...state.subscription,
                    loading: false,
                    error,
                }
            }, 'getSubscription Error');
        });
});
