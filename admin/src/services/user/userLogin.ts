import {createAsyncService} from 'services/createAsyncService/createAsyncService';
import {API} from 'api/api';
import request from 'superagent';

const BARISTA_AUTH_URL = `${API}/users/auth/barista`;

interface UserLoginOptions {
    email: string;
    password: string;
}

export const userLogin = createAsyncService<UserLoginOptions>(({email, password}, {getState, setState}) => {
    request.post(BARISTA_AUTH_URL, {
        email,
        password,
    }).then(({body}) => {
        let state = getState();

        let serverAuthData = {
            token: body.id,
            userId: body.userId,
            ttl: body.ttl,
        };

        setState({
            ...state,
            user: {
                ...state.user,
                ...serverAuthData,
                is_authorized: true,
            },
        });

        localStorage.setItem('auth', JSON.stringify(serverAuthData));
    }).catch((error) => {
        if (error.status === 401) {
            console.log('wrong login or password');
        } else {
            console.error(error.status);
        }
    })
});
