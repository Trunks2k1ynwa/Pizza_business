/* eslint-disable require-yield */
import { all, call, takeEvery } from 'redux-saga/effects';
import { getAccountMe } from '../../src/services/AccountApi';

export function* helloSaga() {
  console.log('Hello Sagas!');
}
// Our worker Saga: will perform the async increment task
export function* getMyAccount() {
  yield console.log('trước khi get dc data');
  const accountMe = yield call(getAccountMe);
  console.log('🚀 ~ accountMe:', accountMe);
  yield console.log('sau khi get dc data');
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchGetAccountMe() {
  yield takeEvery('getAccountMe', getMyAccount);
}
export default function* rootSaga() {
  // Kết hợp nhiều watcher saga
  yield all([helloSaga, watchGetAccountMe()]);
}
