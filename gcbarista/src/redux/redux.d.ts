import {Action} from 'redux';
import {State} from 'src/schema/global';

declare type ReduxAction<T> = ({payload: T} & Action);

declare type ReduxAnyAction<T> = ReduxAction<T> | ServiceAction<T>;

declare interface ReduxActionOptions {
    dispatch(action: ReduxAnyAction<any>): any;

    getState(): State;

    setState(state: State, type?: string): void;
}

declare type ServiceCallback<T = any> = (state: State, data: T) => State;
declare type AsyncServiceCallback<T = any> = (data: T, options: ReduxActionOptions) => any;

declare interface ServiceAction<T> {
    (options: ReduxActionOptions): void;

    readonly data: T;
}

declare interface ServiceCreatorSync<T> {
    (data: T): ServiceAction<T>;

    reducer: ServiceCallback<T>;
}

declare interface ServiceCreatorAsync<T> {
    (data: T): ServiceAction<T>;
}

declare type ServiceCreator<T> = ServiceCreatorSync<T> | ServiceCreatorAsync<T>;

// Connect

export interface UnpackedConnect {
    dispatch(action: ReduxAnyAction<any>): any;
}
