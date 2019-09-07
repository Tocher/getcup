import {State} from 'schema/State/State';

export const initialState: State = {
    user: {
        auth_checked: false,
        is_authorized: false,
    }
};
