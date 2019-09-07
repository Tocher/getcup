import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import * as api from 'src/api';
import NavigationService from 'src/navigation/NavigationService';

export interface CreateSubscriptionOptions {
    subsTypeId: number;
    subsSubtypeId: number;
}

export const createSubscription = createAsyncService<CreateSubscriptionOptions>(async ({subsTypeId, subsSubtypeId}, {getState, dispatch, setState}) => {
    let state = getState();

    let serverToken = state.auth && state.auth.serverToken;
    let {userId, id} = serverToken;

    let data;

    try {
        NavigationService.navigate('Payment');

        data = await api.createSubscription(id, {
            userId: userId,
            subscriptionTypeId: subsTypeId,
            subscriptionSubtypeId: subsSubtypeId,
        });

        state = getState();

        setState({
            ...state,
            subscription: {
                ...state.subscription,
                data: data.body,
            }
        });
    } catch (error) {
        console.log('Payment error:', error.status, error.response.body.error.message);
        // todo: show error on device
    }
});
