import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import * as api from 'src/api';
import NavigationService from 'src/navigation/NavigationService';

export const successSubscription = createAsyncService<any>(async (empty, {getState, dispatch, setState}) => {
    let state = getState();

    let serverToken = state.auth && state.auth.serverToken;
    let {id} = serverToken;
    let subsId = state.subscription.data && state.subscription.data.id;

    NavigationService.navigate('PaymentSuccess');

    try {
        let data = await api.setSubscriptionStatus(id, subsId, 'confirmed');

        state = getState();

        setState({
            ...state,
            subscription: {
                ...state.subscription,
                data: data.body,
            }
        });

    } catch (error) {
        console.log('error:', error);
    }
});
