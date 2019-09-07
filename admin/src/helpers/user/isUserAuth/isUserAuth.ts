import {State} from 'schema/State/State';

export const isUserAuth = function(state: State) {
    return state.user.is_authorized;
};
