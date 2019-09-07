import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import * as api from 'src/api';
import NavigationService from 'src/navigation/NavigationService';

export const cancelSubscription = createAsyncService<any>(async (empty, {getState, dispatch, setState}) => {
    let state = getState();

    let id = state.auth && state.auth.serverToken.id;
    let subsId = state.subscription.data && state.subscription.data.id;

    try {
        let data = await api.setSubscriptionStatus(id, subsId, 'cancelled');

        state = getState();

        setState({
            ...state,
            subscription: {
                ...state.subscription,
                data: undefined,
            }
        });

        NavigationService.navigate('CoffeeTab');

    } catch (error) {
        console.log('error:', error);
    }
});
