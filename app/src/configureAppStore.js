import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './reducers';
import rootSaga from './sagas';

const configureAppStore = (preloadedState) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            let middlewares = getDefaultMiddleware({thunk: false,}).concat(sagaMiddleware)
            if (process.env.NODE_ENV === 'development') middlewares.push(logger);
            return middlewares
        },
        preloadedState
    })

    sagaMiddleware.run(rootSaga);

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
    }

    return store;
}

export default configureAppStore
