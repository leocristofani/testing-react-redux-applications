import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/reducers/user_reducer';

const mainReducer = combineReducers({
    user: userReducer
});

export default function configureStore(initialState = {}) {
    const composeEnhancers = typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  ? 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
        // other store enhancers if any
    );
    return createStore(mainReducer, initialState, enhancer);
}