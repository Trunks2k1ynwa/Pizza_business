import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  getAccountMeError,
  getAccountMeRequest,
  getAccountMeSuccess,
} from '../actions/accountActions';
import { getAccountMe } from '../../src/services/AccountApi';

function* getMyAccount(action) {
  try {
    if (action?.account) {
      yield put({ type: 'GET_ACCOUNT_REQUEST', action });
      console.log('worker-saga');
      yield put(getAccountMeSuccess(action));
    } else {
      yield put(getAccountMeRequest());
      const data = yield call(getAccountMe);
      const accountMe = data?.data.data;
      console.log('🚀 ~ accountMe:', accountMe);
      yield put(getAccountMeSuccess(accountMe));
    }
  } catch (error) {
    yield put(getAccountMeError(error));
  }
}

function* watchAccount() {
  yield takeEvery('GET_ACCOUNT', getMyAccount);
}
export default function* rootSaga() {
  // Kết hợp nhiều watcher saga
  yield all([call(watchAccount)]);
}
// export default watchAccount;
