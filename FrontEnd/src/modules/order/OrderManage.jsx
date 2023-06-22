import { memo, useEffect } from 'react';
import Button from '../../components/atoms/Button.jsx';
import InputSearch from '../../components/molecules/InputSearch.jsx';
import IconEye from '../../components/atoms/IconEye.jsx';
import DeleteIcon from '../../components/atoms/DeleteIcon.jsx';
import { v4 as uuidv4 } from 'uuid';
// import { Tag } from '../../components/atoms/Tag.jsx';
import http from '../../services/http.js';
import { setOrders } from '../../../redux/slices/orderSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { convertDate } from '../../utils/common';
import { Tag } from '../../components/atoms/Tag.jsx';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

const OrderManagement = () => {
  const oders = useSelector((value) => value.order.orders);
  console.log('🚀 ~ oders:', oders);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const response = await http.get('orders');
      const orderList = response.data.data;
      dispatch(setOrders(orderList));
    };
    getData();
  }, [dispatch, oders.length]);
  const handleUpdateOrder = async (orderId) => {
    try {
      await http.patch(`orders/${orderId}`, {
        status: 'accepted',
      });
      toast.success('Xác nhận đơn hàng thành công', {
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'white',
          background: '#28A745',
        },
      });
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  };
  if (!oders) return null;
  return (
    <div className='bg-white rounded-2xl shadow-lg py-10 w-full'>
      <Toaster position='top-right' reverseOrder={false} />

      <div className='p-10 pt-0 center-cross justify-between'>
        <h3 className='font-bold text-primary'>List Order</h3>
        <div className='flex gap-x-10'>
          <Button to='/manage/add-order'>
            <i className='fa-solid fa-plus pr-4' />
            Thêm mới
          </Button>
          <InputSearch className='w-[10rem]' />
          <select
            className='bg-graySemi text-xl font-semibold px-4 py-3 rounded-lg border-primary border'
            name='filter'
            id='filer-product'
          >
            <option value='name'>Tên đơn hàng</option>
            <option value='price'>Giá sản phẩm</option>
            <option value='category'>Tình trạng</option>
          </select>
        </div>
      </div>
      <table className='text-2xl min-h-[48vh] whitespace-nowrap w-full text-left border-collapse border-spacing-6 overflow-x-auto overflow-hidden block hover:border-collapse'>
        <thead className='bg-graySemi border'>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Order_date</th>
            <th>Address</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {oders &&
            oders.map((order) => (
              <tr
                className='transition-all hover:bg-semi hover:text-primary cursor-pointer border'
                key={uuidv4()}
              >
                <td>{order?._id}</td>
                <td>{order?.account.username}</td>
                <td>{convertDate(order?.createdAt)}</td>
                <td>{order?.account?.address}</td>
                <td>{order?.payment}</td>
                <td>{order?.totalMoney.toLocaleString('vi')}đ</td>
                <td>
                  <Tag type={order?.status}>{order?.status}</Tag>
                </td>
                <td className='flex'>
                  <IconEye to={`/order-checkout/${order?._id}`} />
                  <button
                    onClick={() => handleUpdateOrder(order?._id)}
                    type='button'
                    className='mx-3 text-sm p-2 border rounded-lg transition-all hover:bg-primary hover:text-white'
                  >
                    {order.status === 'pending' ? 'Xác nhận' : 'Đã xác nhận'}
                  </button>
                  <DeleteIcon />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className='text-center mt-10'>
        <Button>Xem thêm</Button>
      </div>
    </div>
  );
};
export default memo(OrderManagement);
