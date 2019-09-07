import {createService} from 'services/createService/createService';

export const checkLogin = createService((state) => {
    let auth = localStorage.getItem('auth');

    if (auth) {
        try {
            let authData = JSON.parse(auth);

            // check TTL

            return {
                ...state,
                user: {
                    ...state.user,
                    token: authData.token,
                    ttl: authData.ttl,
                    userId: authData.userId,
                    is_authorized: true,
                    auth_checked: true,
                }
            };
        } catch (error) {
            //clear
        }
    }

    return {
        ...state,
        user: {
            ...state.user,
            auth_checked: true,
        }
    };
});
