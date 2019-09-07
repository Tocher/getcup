import {State} from 'schema/State/State';

export const getUserToken = function(state: State): Optional<string> {
    return state.user.token;
};
