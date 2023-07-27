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
## Dispatching Actions : put
- Là việc gửi các actions từ các generator functions để tương tác với store trong redux bằng việc sử dụng các effect trong redux saga để tạo ra các kênh truyền thông giữa saga và store
- Sử dụng effect put để dispatch một action
```js
  const accountMe = yield call(getAccountMe);
    // create and yield a dispatch Effect
  yield put({ type: 'set account', accountMe });
```
## Effect
- Redux-saga cung cấp một lợi thế khác so với redux-thunk. Trong phần Nâng cao, bạn sẽ bắt gặp một số Hiệu ứng mạnh mẽ hơn cho phép bạn thể hiện các luồng điều khiển phức tạp trong khi vẫn mang lại lợi ích tương tự về khả năng kiểm tra
## Error Handling
- Để xử lý lỗi trong saga có thể dùng 1 số các sau đây
+ try/catch
```js
try {
    const { data } = yield call(getAccountError);
    const accountMe = data.data;
    // create and yield a dispatch Effect
    yield put({ type: 'set_account', accountMe });
  } catch (error) {
    yield put({ type: 'set_account_fail', error });
  }
```
+ catch block global
```js
function* rootSaga() {
  try {
    yield all([
      watchFetchData(),
      // Các saga khác
    ]);
  } catch (error) {
    // Xử lý lỗi toàn cục ở đây
    yield put({ type: 'GLOBAL_ERROR', error });
  }
}
```
## Using Saga Helper : Take every, takeLatest,throttle ,debounce 
- Redux-saga cung cấp các saga-helper dùng để thực thi worker-saga khi có action được dispatch đến store
- Các saga-helper :
+ takeEvery : Cho phép nhiều phiên bản tìm nạp dữ liệu được bắt đầu đồng thời một cách bất đồng bộ ( tìm nạp dữ liệu mới trong khi dữ liệu cũ vẫn đang tìm nạp và chưa kết thúc)
+ takeLatest : Chỉ cho phép 1 tác vụ tìm nạp dữ liệu chạy bất cứ lúc nào.Và nó sẽ là nhiệm vụ bắt đầu mới nhất. Nếu 1 tác vụ trước đó vẫn đang chạy khi một tác vụ tìm nạp dữ liệu khác được bắt đầu, thì tác vụ trước đó sẽ tự động hủy.
# Các thành phần nâng cao
## Channels : Chưa xong (hơi khoai)
- Channels trong Redux-Saga là một cơ chế cho phép bạn giao tiếp và trao đổi dữ liệu giữa các saga và bên ngoài. Channels cho phép bạn tạo ra các kênh dữ liệu để đẩy và lấy dữ liệu một cách đồng bộ hoặc bất đồng bộ.
- channel đồng bộ : dùng để truyền data giữa các saga một cách đồng bộ (eventChannel, buffer)
- Channels bất đồng bộ : Được sử dụng để truyền dữ liệu giữa saga và các nguồn dữ liệu bất đồng bộ như WebSockets, kết nối TCP/IP, hoặc các sự kiện DOM (eventChannel)
+ eventChannel được dùng để kết nối các take effects với dữ liệu bên ngoài
+ Tạo channel sử dụng channel và dùng take/put Effects để giao tiếp giữa 2 sagas
### take
- là một hàm blocking (chặn) trong Redux-Saga, nó được sử dụng để lắng nghe *một* action cụ thể từ store. Khi gọi take, saga sẽ chờ đợi cho đến khi action được gửi đến store trước khi tiếp tục thực hiện các công việc tiếp theo.Khi một hành động được gửi đi, take sẽ bắt đầu chạy lại generator và trả về hành động đó cho bạn xử lý.
```js
function* watchRequests() {
  // yield take được handle khi có sự kiện dispatch action lên store, hay yield put..., sau khi saga của yield handle xong mới chạy lạy code yield pute
  const { accountMe } = yield take('set_account');
  console.log('🚀 ~ accountMe:', accountMe);
  console.log('take');
  yield call(handleRequest, accountMe);
}
```
### fork
- fork là một hàm non-blocking (không chặn) trong Redux-Saga, nó được sử dụng để chạy một công việc không đồng bộ mà không chờ kết quả trả về. Saga sẽ tiếp tục thực hiện các công việc khác mà không bị chặn bởi công việc được fork.
```js
function* watchRequests() {
  while (true) {
    const {payload} = yield take('REQUEST')
    yield fork(handleRequest, payload)
    console.log('block')
  }
}

function* handleRequest(payload) { ... }
```
### actionChannel
- Cơ chế cho phép bạn theo dõi *nhiều* actions cụ thể và thực hiện các xử lý tương ứng khi có hành động được gửi đi. Khi bạn tạo một action channel, nó sẽ trả về một channel (kênh) đặc biệt mà bạn có thể sử dụng để theo dõi các hành động.
```js
// 1- Create a channel for request actions
  const channel = yield actionChannel('set_account');
  // 2- take from the channel
  const payload = yield take(channel);
  // 3- Note that we're using a blocking call
  yield call(handleRequest, payload);
```
### eventChannel

## Composing Sagas : while + take
- Xử lý một hoặc nhiều nhiệm vụ con song song, khi dùng yield call trong GF, saga sẽ đợi fetchData hoàn thành trước khi tiếp tục lắng nghe và xử lý action *fetch_data* tiếp theo
```js
function* watchFetch() {
  while (yield take('fetch_data')) {
    yield call(fetchPosts) // waits for the fetchPosts task to terminate
  }
}
```
## Concurrency : takeEvery, takeLatest
- takeEvery (pattern,saga)
Hàm takeEvery lắng nghe mọi lần dispatch một action khớp với pattern và gọi saga tương ứng mỗi khi action được dispatch. Khi takeEvery nhận được action, nó tạo một instance mới của saga và chạy nó song song với các instance saga trước đó đã được tạo. Điều này cho phép nhiều instance của saga cùng chạy đồng thời và xử lý các action một cách độc lập.
- takeLatest (pattern, saga)
Hàm takeLatest cũng lắng nghe các lần dispatch action khớp với pattern, nhưng nó chỉ chạy một instance của saga tại một thời điểm. Nếu một action mới được dispatch trong khi saga đang chạy, takeLatest sẽ hủy bỏ instance saga đang chạy hiện tại và tạo một instance mới để xử lý action mới.
## Fork Model : rẽ nhánh, tạo quy trình con
- Nhánh con vẫn được gắn với bố mẹ theo quy tắc sau:
*fork*
- Nhánh con chạy độc lập và chạy  song song với quy trình gốc. Quy trình con sẽ chạy bất đồng bộ và không ảnh hưởng đến quy trình gốc, điều này giúp tăng khả năng xử lý đồng thời và đảm bảo rằng việc thực thi các công việc không bị chặn.
- Saga chấm rứt khi :
+ Các nhánh con chấm rứt
+ Nhánh chính của nó bị chấm rứt
*spawn*
- Quy trình con được tạo bởi spawn sẽ chạy độc lập với quy trình gốc và không gây ảnh hưởng đến việc thực thi các công việc trong quy trình gốc. Một điểm quan trọng là nếu quy trình gốc kết thúc hoặc bị hủy bỏ, quy trình con được tạo bởi spawn vẫn tiếp tục chạy mà không bị ảnh hưởng.
### Fork
- Nó tạo ra một quy trình con (subprocess) độc lập và chạy nó song song với quy trình gốc. Quy trình con sẽ chạy bất đồng bộ và không ảnh hưởng đến quy trình gốc, điều này giúp tăng khả năng xử lý đồng thời và đảm bảo rằng việc thực thi các công việc không bị chặn.
## Future Actions : Lắng nghe các dispatch (take, takeLates)
- là một khái niệm để lắng nghe và phản ứng với các action được dispatch trong tương lai. Điều này cho phép bạn xử lý các tác vụ không đồng bộ dựa trên các action sẽ được dispatch sau này.
- Để thực hiện pulling future actions, Redux-Saga cung cấp các hiệu chỉnh (effect) như take, takeEvery, takeLatest,... để lắng nghe các action cụ thể hoặc mẫu action và thực thi các tác vụ tương ứng khi action được dispatch.
```js
function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  })
}

function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}
```
## Non-blocking calls: Gọi đến các tác vụ bất đồng bộ
- call : Đồng bộ
- fork : bất đồng bộ
- cancelled
- cancel
## Racing Effects : lấy ra effect hoàn thành đầu tiên (race)
- racing effect là một hiệu ứng (effect) cho phép thực hiện nhiều tác vụ không đồng bộ cùng một lúc và trả về kết quả của tác vụ nhanh nhất.
```js
// race 2 effect và kiểm tra trường hợp cái nào resolve nhanh nhất để xử lý
 const { products, timeout } = yield race({
    products: call(getAllProduct),
    timeout: delay(4000),
  });

  if (products) {
    console.log(products);
  } else {
    console.log('daylay');
  }
```

## Root Saga : khuôn mẫu của root saga

*yield all*: all là effect cho phép các saga trong array thực thi song song với nhau một cách bất đồng bộ
*yield all* là block, nên các code effect sau all không được chạy khi effect all chạy xong
```js
yield all([
    helloSaga(),
    watchIncrementAsync()
    // code after all-effect
  ])
```
### Non-blocking effect fork 
- Cho phép tạo ra các saga con chạy độc lập mà không làm ảnh hướng saga gốc và các saga khác
- yield fork là non-block, các code phía dưới effect fork vẫn được chạy ngay cả khi fork chưa done

```js
export default function* rootSaga() {
  yield fork(saga1)
  yield fork(saga2)
  yield fork(saga3)
  // code after fork-effect
}
```
### Nesting fork effects in all effect
+ code sau effect all sẽ được thực thi ngay lập tức vì mỗi hiệu ứng rẽ nhánh không bị chặn và trả về một bộ mô tả tác vụ một cách đồng bộ.
```js
const [task1, task2, task3] = yield all([ fork(saga1), fork(saga2), fork(saga3) ])
```
### Avoid fork effect in race effect 
- fork effect trong race thì gần như tạo một bug, vì fork là non-blocking, nó sẽ luôn win trong race
```js
yield race([
  fork(someSaga),
  take('SOME-ACTION'),
  somePromise,
])
```
### Giữ cho root saga luôn executed
- rootSaga của bạn sẽ chấm dứt ở lỗi đầu tiên trong bất kỳ hiệu ứng con hoặc saga riêng lẻ nào và làm sập toàn bộ ứng dụng của bạn
- *spawn* là một hiệu ứng sẽ ngắt kết nối câu chuyện con của bạn khỏi cha mẹ của nó, cho phép nó thất bại mà không làm hỏng cha mẹ của nó
```js
export default function* rootSaga() {
  yield spawn(saga1)
  yield spawn(saga2)
  yield spawn(saga3)
}
```

### Giữ cho sagas in root luôn alive
- Khi có trường hợp fail thì saga sẽ tự động khởi động lại và tiếp tục hoạt động sau khi bị lỗi
```js
function* rootSaga () {
  const sagas = [
    saga1,
    saga2,
    saga3,
  ];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );
}
```
## Running Tasks in Parallel
Khi dùng yield call truyền vào 1 mảng các effect, generator sẽ bị block cho đến khi tất cả effect được resolve , hoặc ngay khi một effect bị reject (Giống như promise.all)
```js
import { all, call } from 'redux-saga/effects'

// correct, effects will get executed in parallel
const [users, repos] = yield all([
  call(fetch, '/users'),
  call(fetch, '/repos')
])
```
## Task Cancellation
- Khi 1 task forked, nó có thể được hủy bỏ bằng việc sử dụng yield cancle(task)
- yield cancelled() để kiểm tra nếu 1 generator đã được cancel hay chưa
-  Trong race effect, Khi muốn cancel tự động, chỉ get winner và tự động cancelled với các saga khác
- Trong yield all, các effect chạy song song có 1 effect mà bị reject, tất cả các effect còn đều tự động bị cancelled
````js
function* bgSync() {
  try {
    while (true) {
      yield put(actions.requestStart())
      const result = yield call(someApi)
      yield put(actions.requestSuccess(result))
      yield delay(5000)
    }
  } finally {
    if (yield cancelled())
      yield put(actions.requestFailure('Sync cancelled!'))
  }
}

function* main() {
  while ( yield take('START_BACKGROUND_SYNC') ) {
    // starts the task in the background
    const bgSyncTask = yield fork(bgSync)

    // wait for the user stop action
    yield take('STOP_BACKGROUND_SYNC')
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask)
  }
}
````
# Recipes
## Throttling
- Giới hạn thực hiện các saga, đảm bảo task chỉ được thực hiện sau một khoảng thời gian nhất định
- Saga chỉ được gọi sau mỗi khoản thời gian time và chỉ khi hành động trùng với pattern
- Khi có action === pattern sẽ call fetchData, khi có action khác === pattern, sẽ call fetchData sau 1s, các lần tiếp theo tương tự
```js
function* fetchData(action) {
  // Thực hiện các tác vụ lấy dữ liệu
}

function* watchFetchData() {
  yield throttle(1000, 'FETCH_DATA', fetchData)
}
```
## Debouncing
- saga sẽ chỉ được gọi sau khi không có hành động mới trong khoảng thời gian time. Nếu có hành động mới trong khoảng thời gian đó, thì saga sẽ bị hủy bỏ và bắt đầu từ đầu
- Luồng hoạt động:
+ call search khi action == pattern ngay lập tức
+ call search khi action == pattern sau 300s
+ Trong khoảng 300s, nếu có action khác === pattern, huyển saga trước đó và thực hiện saga mới
+ Sử dụng debouce = takeLatest + delay
```js
function* search(action) {
  // Thực hiện tìm kiếm
}
// saga search sẽ chỉ được gọi sau 300ms sau khi không có hành động SEARCH mới được gửi đi. Nếu có hành động SEARCH mới trong 300ms, thì saga sẽ bị hủy và bắt đầu từ đầu.
function* watchSearch() {
  yield debounce(300, 'SEARCH', search)
}
```
## Retrying XHR calls​
- Thực hiện lại saga khi xử lý bị lỗi
```js
function* updateApi(data) {
  while (true) {
    try {
      const apiResponse = yield call(apiRequest, { data })
      return apiResponse
    } catch (error) {
      yield put({
        type: 'UPDATE_RETRY',
        error,
      })
      yield delay(2000)
    }
  }
}
```
## Undo
## Batching actions
# Glossary : Chú thích
## Effect : 
- Là 1 *plain Javascript Object*
- Chứa 1 số lệnh hướng dẫn để thực thi sagaMiddleware
- Tạo các effects sử dụng *factory-function* cung cấp bởi saga: call,vvv
## Task
- Giống như 1 tiến trình chạy trên nên, để tạo nhiều task chạy song song, chúng ta sử dụng *fork*
## Blocking/Non-blocking call
- Blocking : Saga tạo ra một Effect và sẽ đợi kết quả thực hiện trước khi tiếp tục thực hiện lệnh tiếp theo bên trong Trình tạo hiệu ứng.
```js
  yield take(ACTION)              // Blocking: will wait for the action
  yield call(ApiFn, ...args)      // Blocking: will wait for ApiFn (If ApiFn returns a Promise)
  yield call(otherSaga, ...args)  // Blocking: will wait for otherSaga to terminate
  yield join(task)  
```
- Non-Blocking : Cuộc gọi không chặn có nghĩa là Saga sẽ tiếp tục ngay lập tức sau khi tạo ra Hiệu ứng.
```js
  yield put(...)                   // Non-Blocking: will dispatch within internal scheduler

  const task = yield fork(otherSaga, ...args)  // Non-blocking: will not wait for otherSaga
  yield cancel(task)                           // Non-blocking: will resume immediately
```
## watcher/worker
- watcher : sẽ theo dõi các lần dispatch action và chuyển xang worker trên mỗi lần lắng nghe action
- worker: sẽ xử lý các action được dispatch và hoàn thành

# Effect creators
## take(pattern)
- GF sẽ tạm dừng cho đến khi một hành động trùng khớp được gửi đi. Tuy nhiên, nếu không có hành động nào được gửi đi, generator sẽ bị treo và không tiếp tục thực thi.
## take(channel)
## takeMaybe(pattern)
- takeMaybe giống với take, nhưng nếu không có hành động nào trùng khớp, nó sẽ trả về null thay vì treo generator.
## takeMaybe(channel)
## takeEvery(pattern,saga,...args)
-  Khi một hành động được gửi đi, takeEvery sẽ tạo ra một instance mới của hàm generator để xử lý hành động đó, mà không cần chờ đợi xử lý hoàn tất trước khi lắng nghe hành động tiếp theo.
```js
yield takeEvery('SOME_ACTION', handleAction);
```
## takeEvery(channel,saga,...args)
## takeLatest(pattern,saga,...args)
- - takeLeading chỉ handle action cuối cùng được dispatched, nó sẽ bỏ qua các action trước đó nếu các action được dispatched trong cùng 1 thời gian ngắn
## takeLatest(channel,saga,...args)
## takeLeading(pattern,saga,...args)
- takeLeading chỉ handle action đầu tiên được dispatched, nó sẽ bỏ qua các action khác nếu các action được dispatched trong cùng 1 thời gian ngắn
```js
 yield takeLeading('SOME_ACTION', handleAction);
```
## takeLeading(channel,saga,...args)

## put(action)
- put(action) là một hàm được sử dụng để gửi một hành động (action) đến Redux Store. Khi được gọi, put sẽ tạo ra một hiệu ứng (effect) trong generator để gửi hành động đó.
```js
yield put({ type: 'FETCH_DATA_SUCCESS', payload: data });
yield put({ type: 'FETCH_DATA_FAILURE', error });
```
## put(channel, action)
## putResolve(action)
- Redux Saga sẽ đảm bảo rằng tất cả các middleware hoặc enhancer đã kết hợp vào Redux Store được xử lý trước khi tiếp tục thực thi generator. Điều này đảm bảo rằng các thay đổi trạng thái của Redux Store được cập nhật hoàn toàn trước khi generator tiếp tục thực hiện các bước tiếp theo.
## call(fn, ...args)
## call([context, fn], ...args)
yield call([localStorage, 'getItem'], 'redux-saga')
## call([context, fnName], ...args)
## call({context, fn}, ...args)
## apply(context, fn, [args])
- context là đối tượng (context) mà phương thức sẽ được gọi.
- fn là tên phương thức (fn) trên đối tượng.
- [args] là một mảng các tham số truyền vào phương thức.
```js
yield apply(api, api.fetchData, [id]);
```
## cps(fn, ...args)
- cps là một effect creator được sử dụng để tạo ra một effect cps, để gọi một hàm không đồng bộ theo kiểu "callback-style". Effect này cho phép gọi các hàm không đồng bộ không trả về một Promise mà thay vào đó sử dụng mô hình callback để xử lý kết quả.
## cps([context, fn], ...args)​
## cps({context, fn}, ...args)