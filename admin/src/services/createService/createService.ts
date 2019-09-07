import {State} from 'schema/State/State';
import {SyncService} from 'redux/redux';

export function createService<T>(callback: (state: State, data: T) => State): SyncService<T> {
    return function (data: T) {
        return function ({getState, setState}) {
            let curState = getState();
            let newState = callback(curState, data);

            if (newState !== curState) {
                setState(newState);
            }
        };
    };
}
