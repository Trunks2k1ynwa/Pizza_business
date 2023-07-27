import { all, call } from 'redux-saga/effects';
import watchAccount from './accountSaga';

export default function* rootSaga() {
  // Kết hợp nhiều watcher saga
  yield all([call(watchAccount)]);
}
