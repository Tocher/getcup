import {SyncService} from 'src/redux/redux';
import {State} from 'src/schema/global';

export function createService<T>(callback: (state: State, data: T) => State): SyncService<T> {
    let creator: SyncService<T> = function (data: T) {
        let service: any = function ({dispatch, getState, setState}) {
            let curState = getState();
            let newState = callback(curState, data);

            if (newState !== curState) {
                setState(newState, callback.name);
            }
        };

        service.data = data;
        service.callback = callback;

        return service;
    } as any;

    creator.reducer = callback;

    return creator;
}
