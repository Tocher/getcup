import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import {initialState} from 'src/redux/initialState';
import {State} from 'src/schema/global';
import {ReduxAction} from 'src/redux/redux';

const loggerMiddleware = createLogger({ predicate: (get, action) => __DEV__ });

export default function configureStore () {
    const middleware = [
        servicesMiddleware,
        loggerMiddleware, // порядок подключения ВАЖЕН
    ];

    let enhancer = compose(applyMiddleware(...middleware));

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

    function servicesMiddleware({dispatch, getState}) {
        return (next) => (action) => {
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
