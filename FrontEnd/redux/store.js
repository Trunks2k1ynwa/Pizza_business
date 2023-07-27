import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import rootSaga from './sagas/rootSaga';
import rootSaga from './sagas/accountSaga.js';
import { rootReducer } from './reducers/rootReducer';

// Tạo middleware Saga
const sagaMiddleware = createSagaMiddleware();

// Tạo Redux Store và áp dụng Saga middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Chạy Saga
sagaMiddleware.run(rootSaga);

export default store;
