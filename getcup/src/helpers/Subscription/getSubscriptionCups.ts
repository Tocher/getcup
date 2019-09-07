import {State} from 'src/schema/global';

export const getSubsctiptionCups = function(state?: State): number {
    return state && state.subscription && state.subscription.data && state.subscription.data.cups || 0;
};
