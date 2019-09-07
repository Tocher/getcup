import {
    AsyncServiceCallback,
    ReduxActionOptions,
    ServiceAction,
    ServiceCreatorAsync
} from 'src/redux/redux';

export function createAsyncService<T = {}>(callback: AsyncServiceCallback<T>): ServiceCreatorAsync<T> {
    return function (data: T): ServiceAction<T> {
        let service: any = function (options: ReduxActionOptions) {
            return Promise.resolve()
                .then(() => callback(data, options));
        };

        service.type = callback.name;
        service.data = data;

        return service;
    };
}
