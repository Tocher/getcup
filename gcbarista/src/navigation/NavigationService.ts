import {NavigationActions, NavigationProp} from 'react-navigation';
import {State} from 'src/schema/global';

let _navigator: NavigationProp<State>;

function setTopLevelNavigator<T>(navigatorRef: NavigationProp<State>) {
    _navigator = navigatorRef;
}

function navigate(routeName: string, params = {}) {
    _navigator.dispatch(
        NavigationActions.navigate({routeName, params})
    );
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
};
