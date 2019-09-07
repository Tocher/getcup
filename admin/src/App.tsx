import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {Main} from 'containers/Main/Main';
import configureStore from 'redux/store';

const store = configureStore();

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Main/>
        </Provider>
    );
};

export default App;
