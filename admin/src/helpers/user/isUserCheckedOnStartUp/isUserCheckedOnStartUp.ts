import {State} from 'schema/State/State';

export const isUserCheckedOnStartUp = function(state: State): Optional<boolean> {
    return state.user.auth_checked;
};
