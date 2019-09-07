import {createAsyncService} from 'src/services/createAsyncService/createAsyncService';
import {AuthSchema} from 'src/schema/global';

interface AvatarResponse {
    first_name: string;
    last_name: string;
    id: number;
    photo_50: string;
}

export const getAvatar = createAsyncService<string>(async (data, {getState, setState}) => {
    let state = getState();

    if (state.auth) {
        let {userId, accessToken} = state.auth;

        const avatar = await fetch(`https://api.vk.com/method/users.get?user_id=${userId}&v=5.23&lang=ru&fields=photo_50&access_token=${accessToken}`)
            .then(function (response) {
                return response.json();
            });

        if (avatar && avatar.response) {
            let avatarData = avatar.response[0] as AvatarResponse;

            state = getState();

            setState({
                ...state,
                auth: {
                    ...state.auth,
                    name: avatarData.first_name + ' ' + avatarData.last_name,
                    firstName: avatarData.first_name,
                    lastName: avatarData.last_name,
                    avatar: {
                        url: avatarData.photo_50,
                        height: 50,
                        width: 50,
                    }
                } as AuthSchema,
            });
        } else {
            console.log(userId, accessToken);
            console.warn('Failed to load AVATAR');
            // TODO no avatar?
        }
    }
});
