import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../services/http.js';
import { setOrderHistory } from '../../../redux/slices/orderSlice.jsx';
import Button from '../../components/atoms/Button.jsx';
import { v4 as uuidv4 } from 'uuid';
import { convertDate } from '../../utils/common.js';
import { isEmpty } from 'lodash';
const OrderMe = () => {
  const dispatch = useDispatch();
  const oderHistory = useSelector((value) => value.order.orderHistory);
  console.log('🚀 ~ oderHistory:', oderHistory);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await http.get('accounts/orderme');
        const orderMe = response.data.data;
        dispatch(setOrderHistory(orderMe));
      } catch (err) {
        return null;
      }
    };

    if (document.cookie.indexOf('jwt') >= 0) {
      getData();
    }
  }, [dispatch]);
  if (isEmpty(oderHistory[0]?.order)) {
    return (
      <div className=''>
        <h2 className='text-5xl my-10 text-primary font-semibold'>
          Thông tin đơn hàng
        </h2>
        <div className='text-center'>
          <img
            className='w-[70%] mx-auto'
            src='/public/No data-cuate.png'
            alt=''
          />
          <p className='text-3xl text-primary font-bold'>
            Bạn chưa có đơn hàng nào 🙄
          </p>
        </div>
      </div>
    );
  }
  // if (isEmpty(oderHistory[0].order)) return <PageNotFound />;
  // console.log(oderHistory[0].order);
  return (
    <div>
      <h2 className='text-5xl my-10 text-primary font-semibold'>
        Thông tin đơn hàng
      </h2>
      {oderHistory.map(({ order }) => (
        <div
          key={uuidv4()}
          className='flex flex-col gap-y-3 text-2xl my-6 px-10 py-8 bg-white border-2 border-primary rounded-xl'
        >
          <div>
            <span className='mr-4'>{convertDate(order?.createdAt)}</span>
            <span className=''>Mã đơn hàng: {order?._id}</span>
          </div>
          <h5 className='font-bold'>
            Hình thức:
            {order?.payment == 'online'
              ? ' Thanh toán online'
              : ' Thanh toán khi nhận hàng'}
          </h5>
          <span>
            Giao đến: {order?.account.address}-{order?.account.addressDetail}{' '}
          </span>
          <span>
            {order?.products.length} sản phẩm (
            {order?.totalMoney.toLocaleString('vi')}Đ )
          </span>
          <div className='border-2 border-primary'></div>
          <h5 className='font-bold'>
            Tình trạng :{' '}
            {order?.status == 'pending'
              ? 'Đang chờ xác nhận'
              : 'Đã xác nhận đơn hàng'}
          </h5>
          <Button
            to={`/order-checkout/${order?._id}`}
            className='w-fit'
            kind='small'
          >
            Xem chi tiết
          </Button>
        </div>
      ))}
    </div>
  );
};

export default OrderMe;
