import React from 'react';
import { render } from 'react-dom';
import App from './app';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);