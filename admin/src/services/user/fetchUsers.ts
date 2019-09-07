import {createAsyncService} from 'services/createAsyncService/createAsyncService';
import request from 'superagent';
import {API} from 'api/api';
import {getUserToken} from 'helpers/user/getUserToken/getUserToken';
import {updateStore} from 'services/common/updateStore';
import {CollectionResponse, UserSchema} from 'schema/State/State';

const STORE_KEY = 'users';

export const fetchUsers = createAsyncService(async (data, {getState, setState, dispatch}) => {
    let state = getState();
    let token = getUserToken(state);
    let collection = state[STORE_KEY] as CollectionResponse<any>;

    dispatch(updateStore({
        [STORE_KEY]: {
            ...collection,
            _loading: true,
        } as CollectionResponse<UserSchema>,
    }));

    try {
        let res = await request
            .get(`${API}/users/`, data)
            .set('Authorization', token);

        dispatch(updateStore({
            [STORE_KEY]: {
                results: res.body,
                _loading: false,
            } as CollectionResponse<UserSchema>,
        }));
    } catch (error) {
        collection = getState()[STORE_KEY] as CollectionResponse<any>;

        dispatch(updateStore({
            [STORE_KEY]: {
                ...collection,
                _loading: false,
                _errorLoading: true,
            } as CollectionResponse<UserSchema>,
        }));
    }
});
