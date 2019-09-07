import { createStore, applyMiddleware, compose } from 'redux';
import {ReduxAction} from 'redux/redux';
import {State} from 'schema/State/State';
import {initialState} from 'redux/initialState';

interface ServicesOptions {
    dispatch: () => void;
    getState: () => void;
}

export default function configureStore () {
    const middleware = [
        servicesMiddleware,
    ];

    let enhancer = compose(applyMiddleware(...middleware));

    //if (IS_CLIENT && IS_DEV) {
        let composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        enhancer = composeEnhancers(enhancer);
    //}

    const store = createStore(
        replaceReducer,
        initialState as any,
        enhancer,
    );

    function replaceReducer(state: State, action: ReduxAction<any>) {
        // сервисы
        if (action.payload) {
            return action.payload;
        }

        return state;
    }

    function dispatch(action: ReduxAction<any>) {
        return store.dispatch(action);
    }

    function servicesMiddleware({dispatch, getState}: ServicesOptions) {
        return (next: any) => (action: any) => {
            if (typeof action === 'function') {
                return action({
                    dispatch,
                    getState,
                    setState,
                });
            }

            return next(action);
        };
    }

    function setState(state: State, type: string = 'setState') {
        dispatch({type, payload: state});
    }

    return store;
}
