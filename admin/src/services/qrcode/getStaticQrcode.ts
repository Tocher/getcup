import {createAsyncService} from 'services/createAsyncService/createAsyncService';
import request from 'superagent';
import {API} from 'api/api';
import {getUserToken} from 'helpers/user/getUserToken/getUserToken';
import {updateQrcode} from 'services/qrcode/updateQrcode';

export const getStaticQrcode = createAsyncService(async (data, {getState, dispatch}) => {
    let state = getState();
    let token = getUserToken(state);

    // TODO
    const CAPUCHINO = '5cebf52a9886ce78b7153a9e';

    try {
        let res = await request
            .post(`${API}/qrcode/static`, {
                productId: CAPUCHINO,
                userId: state.user.userId,
                userToken: token,
            })
            .set('Authorization', token);

        dispatch(updateQrcode(res.body));
    } catch (error) {

    }
});
