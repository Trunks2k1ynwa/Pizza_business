# useCallBack
- được dùng để catche function sau mỗi lần render
- Khi sử dụng useCallback, function sẽ được catche giữa các lần render cho đến khi dependencies thay đổi
- Giúp cho thằng memo hoạt động bình thường khi có prop là funtion, object, bởi vì các giá trị này luôn tham chiếu đến vùng nhớ mới khi rerender (useCallBack giải quyết vấn đề này)
- Khi useCallback được gọi trong quá trình render ban đầu của một component, nó sẽ tạo ra một callback function mới và trả về nó. Từ lần render thứ hai trở đi, callback function sẽ được lưu giữ và chỉ trả về lại khi dependencies của useCallback thay đổi.

- Mặc định : Component cha re-render thì component con re-render

- Ưu điểm :
+ Tối ưu hóa hiệu năng website
+ React sẽ memoize,cache function và chỉ tạo ra 1 phiên bản mới của các phụ thuộc thay đổi
+ Ngăn chặn việc re-render không cần thiết khi truyền props là 1 function
+ useCallback+memo => Perfect block re-render
+ 



# useMemo : 
- Component cha re-render, component con kiểm tra props có thay đổi hay không, nếu thay đổi thì mới re-render, không thì thôi
#useMemo
- Gọi function và lưu trữ giá trị tham chiếu của giá trị trả về trong callback

# useDererredValue
- Được sử dụng để trì hoãn việc sử dụng giá trị mới nhất của một state trong 1 số tình huống nhất định để tối ưu hiệu suất của ứng dụng.

# useEffect
- useEffect(setup, dependencies)
+ setup : function chứa logic effect (có thể return cleanUp hoặc không)
+ Setup funtion sẽ được invok khi component thêm vào dom lần đầu
+ Sau mỗi lần thay đổi depen làm re-render, react sẽ chạy cleanup fn với giá trị cũ sau đó mới chạy setup function với giá trị mới
+ Sau khi component remove khỏi Dom thì React sẽ chạy cleanUp function lần cuối
+ return underined
+ Nếu sử dụng array, object, function trong depen có thể làm component re-render không cần thiết
+ Nếu call api lấy dữ liệu nên có loading, setup function set loading = false, cleanUp loading = true
+ Nhước điểm của fetching data thủ công :https://react.dev/reference/react/useEffect
+ Nếu trong useEffect có setstate thì sẽ luôn chạy vào useEffect trong lần tiếp theo dù depen không thay đổi.
# useLayoutEffect
- Được gọi ngay trước khi browser cập nhật giao diện
- Thực hiện các thao tác với DOM trước khi Dom được render ra trình duyệt
- useLayoutEffect(setup,dependencies)
- setup function will run before component được thêm vào DOM
- Sau mỗi lần render với dependencies thay đổi, react sẽ chạy cleanUp với giá trị cũ sau đó mới chạy setup function với giá trị mới.
- Thường được sử dụng trong các tình huống sau:
+ Thay đổi kích thước , vị trí của phần từ
# useId
- Là 1 hook dùng để tạo ra ID duy nhất dùng trong component cụ thể
- const password = useId()
# useImperativeHandle
- useImperativeHandle(ref,createHandle,dependencies?)

# useMemo
- Catch giá trị tính toán trong function giữa các lần re-render
- useMemo(calculateValue,dependencies)
- calculateValue :
+ Là 1 function dùng để tính toán giá trị mà bạn muốn catch
+ Đây phải là pure function ,không nên có tham số
+ React sẽ gọi function này trong lần render ban đầu
+ Ở lần render tiếp theo, react sẽ trả về giá trị catch trước đó nếu dependencies không thay đổi ở lần render trước, giá trị này sẽ được lưu trữ và dùng ở lần render tới
+ useMemo trả về kết quả của việc gọi calculateValue với không tham số
+ Trong lần render tiếp theo, nó sẽ trả về giá được lưu trữ từ lần render trước đó nếu depen không thay đổi hoặc được gọi tính toán lại


# useState
- initialState : Giá trị của trạng thái bạn muốn khi khởi tạo, nó có thể là giá trị của các kiểu. Nếu là function thì đây phải là pure function, không có tham số và nên trả về một giá trị của các kiểu dữ liệu
- useState return ra array bao gồm :
+ current state: Giá trị trùng với initialState trong lần render đầu tiên
+ set Funtion cho phép bạn cập nhật giá trị của state sau các mỗi lần render
+ set function không trả về giá trị, nó chi cập nhật giá trị state cho lần render tiếp theo
+ trường hợp state mới bằng state ban đầu thì react sẽ bỏ qua việc re-render. Đây là cách tối ưu hóa
+ React cập nhật dựa trên nguyên lý là chỉ cập nhật lần màn hình khi tất cả các trình xử lý sự kiện đã chạy và đã gọi các hàm thiết lập của chúng. (Batching automatic)