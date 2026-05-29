import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory, createLocation } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import './i18n';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducers } from './store';
import { Auth } from './utilities/Functions';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

Auth.destroyOldCookies();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
