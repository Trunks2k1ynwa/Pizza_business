# Saga-middleware
- Chứa các list saga dùng để run
- connect saga middleware đến redux store
```js
// Tạo middleware Saga
const sagaMiddleware = createSagaMiddleware();

// Tạo Redux Store và áp dụng Saga middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Chạy Saga
sagaMiddleware.run(rootSaga);
```
# Saga : Chứa các generator function để thực thi 
## worker saga
- một generator function được sử dụng để thực hiện các tác vụ không đồng bộ. Nó thực hiện các side effect và gửi các action tương ứng với kết quả của tác vụ. Worker saga có thể chờ đợi các action hoặc các hiệu ứng (effects) khác, ví dụ như gọi API, delay, hoặc tương tác với Redux Store.
```js
// Worker Saga
function* fetchDataWorker() {
  try {
    // Gọi API để lấy dữ liệu
    const data = yield call(api.fetchData);

    // Gửi action thành công với dữ liệu đã nhận được
    yield put(fetchDataSuccess(data));
  } catch (error) {
    // Gửi action thất bại với thông báo lỗi
    yield put(fetchDataFailure(error.message));
  }
}
```
## watcher saga
- watcher saga theo dõi các action và khởi tạo các worker saga tương ứng khi có action được gửi đến. Nó nghe các action và khởi tạo worker saga để xử lý các tác vụ liên quan.
```js
// Watcher Saga
function* watchFetchDataRequest() {
  // Nghe action FETCH_DATA_REQUEST và khởi tạo worker saga tương ứng
  yield takeEvery(FETCH_DATA_REQUEST, fetchDataWorker);
}
```
## root saga
- Dùng để kết hợp nhiều watcher saga
```js
export default function* rootSaga() {
  // Kết hợp nhiều watcher saga
  yield all([
    watchFetchDataRequest()
  ]);
}
```

# Reducer
- Chứa tất cả các reducer bằng compineReducer ra rootReducer
- compineReducer là 1 function với tham số là 1 object chứa tất cả các reducer qua key và value
- key : Tên của reducer đó
- value : slice ứng với reducer đó
- slice : là 1 object gồm:
name: 'tên slide',
  initialState: {
    Danh sách các state để quản lý
  },
  reducers: {
    Danh sách các method để handle state
  }

# Action
```js
const action = (type) => store.dispatch({ type });
action('FETCH_DATA_REQUEST');
//Hoặc
const dispatch = useDispatch()
dispatch('FETCH_DATA_REQUEST')
```
# Generator function
- Khi bạn gọi một generator function, nó sẽ trả về một iterator (đối tượng có thể duyệt qua các giá trị tuần tự). Bạn có thể sử dụng iterator để duyệt qua các giá trị được sinh ra từ generator function.

# Các thành phần cơ bản
## Declarative Effect : call,put,fork, takelates,takevery
- Định nghĩa lại các side effect một cách rõ ràng và dễ đọc sử dụng **effect creators**
- Các **effect creators** trong Redux Saga cho phép bạn mô tả các side effect dưới dạng các đối tượng plain JavaScript gọi là "effects". Những effects này được chuyển đến yield statement trong generator function để Saga middleware có thể xử lý chúng.
- **effect creators** : call, put, takelatest, takevery
```js
const users = yield call(api.getUsers);
    yield put(getUsersSuccess(users))
// put(getUsersSuccess(users)),call(api.getUsers) là các effects
```
## Dispatching Actions
## Effect
## Error Handling
## Using Saga Helper
# Các thành phần nâng cao
## Channels
## Composing Sagas
## Concurrency
## Fork Model
## Future Actions
## Non-blocking calss
## Racing Effects
## Root Saga
## Running Tasks in Parallel
## Task Cancellation
