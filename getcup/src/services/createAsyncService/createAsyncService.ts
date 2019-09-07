import {ReduxAction, ReduxActionOptions, ReduxAsyncAction} from 'src/redux/redux';

export function createAsyncService<T = {}>(callback: ReduxAsyncAction<T>) {
    return function (data: T): ReduxAction<any> {
        return function (options: ReduxActionOptions) {
            return Promise.resolve()
                .then(() => callback(data, options));
        } as any;
    };
}
