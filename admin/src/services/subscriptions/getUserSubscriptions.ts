import {createAsyncService} from 'services/createAsyncService/createAsyncService';
import {getUserToken} from 'helpers/user/getUserToken/getUserToken';
import {API} from 'api/api';
import request from 'superagent';

export interface GetUserSubscriptionsOptions {
    userId: string;
}

export const getUserSubscriptions = createAsyncService<GetUserSubscriptionsOptions>(async ({userId}, {getState}) => {
    let state = getState();
    let token = getUserToken(state);

    try {
        let res = await request
            .get(`${API}/subscriptions/custom/user/${userId}`)
            .set('Authorization', token);

        console.log(res);
    } catch (error) {

    }
});
