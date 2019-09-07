import {Action} from 'redux';
import {State} from 'schema/State/State';

declare type ReduxAction<T> = ({payload: T} & Action);

declare type ReduxAnyAction<T> = ReduxAction<T> | SyncServiceAction<T>;

declare interface ReduxActionOptions {
    dispatch(action: ReduxAnyAction<any>): any;

    getState(): State;

    setState(state: State, serviceName?: string): void;
}

declare type ReduxAsyncAction<T = any> = (data: T, options: ReduxActionOptions) => any;

declare type SyncServiceAction<T> = (options: ReduxActionOptions) => void;
declare type SyncService<T> = (data: T) => SyncServiceAction<T>;
