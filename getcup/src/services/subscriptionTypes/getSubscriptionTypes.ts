import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import * as api from 'src/api';
import {updateStore} from 'src/services/common/updateStore';

export const getSubscriptionTypes = createAsyncService<any>(async (empty, {getState, dispatch, setState}) => {
    let state = getState();

    setState({
        ...state,
        subscriptionTypes: {
            ...state.subscriptionTypes,
            loading: true,
        },
    });

    let serverToken = state.auth && state.auth.serverToken;
    if (!serverToken) return;
    let {id} = serverToken;

    try {
        let data = await api.getSubscriptionTypes(id);

        // Временно рисую тут картинки
        if (data.body) {
            data.body.map(function(e, i) {
                //e.illustration = 'https://fotodes.ru/upload/img1345631713.jpg';
                //e.illustration = 'app/assets/images/subscriptions/white2.jpg'
                e.illustration = require('src/assets/images/login/background-2.jpg')
            });
        }

        state = getState();

        setState({
            ...state,
            subscriptionTypes: {
                ...state.subscriptionTypes,
                data: data.body,
                loading: false,
            },
        });

    } catch (error) {
        console.log('error:', error);

        state = getState();

        dispatch(updateStore({
            subscriptionTypes: {
                ...state.subscriptionTypes,
                loading: false,
                error,
            },
        }));
    }
});
