import * as React from 'react';

import {connect as reactConnect} from 'react-redux';
import {ReduxAnyAction} from 'src/redux/redux';
import {State} from 'src/schema/global';

export interface UnpackedConnect {
    dispatch(action: ReduxAnyAction<any>): any;
}

export type ConnectMapStateToProps<Props, Inner> = (state: State, props: Props) => Inner;

export type ConnectFunctionComponent<Props, Inner> = (props: Props & Inner & { children?: React.ReactNode } & UnpackedConnect)
    => React.ReactElement<any> | null;

export type ConnectClassComponent<Props, Inner> = React.ComponentType<Props & Inner>;

export type ConnectComponent<Props, Inner> = ConnectFunctionComponent<Props, Inner> | ConnectClassComponent<Props, Inner>;

export type ConnectReturn<Props, Inner> = (component: ConnectComponent<Props, Inner>) => React.ComponentClass<Props>;

function getDisplayName<Props = {}, Inner = {}>(component: ConnectComponent<Props, Inner>) {
    return (component as any).displayName || component.name || '?';
}

/**
 * Type patched version of connect
 */
export function connect<Props = {}, Inner = {} | any>(stateToProps?: ConnectMapStateToProps<Props, Inner>): ConnectReturn<Props, Inner> {
    return (component: ConnectComponent<Props, Inner>) => {
        let fn = reactConnect(stateToProps)(component as any) as any;

        if (__DEV__) {
            fn.displayName = `Connect(${getDisplayName(component)})`;
            fn.Component = component;
        }

        return fn;
    };
}
