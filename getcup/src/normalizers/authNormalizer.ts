import {AuthSchema} from 'src/schema/global';

export const authNormalizer = function (auth: any): AuthSchema {
    let name = auth.name;

    if (!name) {
        if (auth.avatar) {
            name = auth.avatar.first_name;
        } else {

        }
    }

    let normalizedAuth = {
        ...state.auth,
        accessToken: auth.access_token,
        email: auth.email,
        authType: 'vk',
        userId: auth.user_id,
        isLoggedIn: true,
        checking: true,
    } as any;

    return {
        name,

        accessToken: auth.access_token || auth.accessToken,

        ...auth,
    }
};
