/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../components/atoms/Heading.jsx';
import { compareTime } from '../utils/constant.js';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import http from '../services/http.js';
import { isEmpty } from 'lodash';
import { setOrderNow } from '../../redux/slices/orderSlice.jsx';

const CheckOutOrder = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((value) => value.order.orderNow);
  console.log('🚀 ~ orderData:', orderData);
  const orderId = useParams().id;
  const account = useSelector((value) => value.account.account);
  useEffect(() => {
    const getData = async () => {
      const response = await http.get(`orders/${orderId}`);
      const orderData = response.data.data;
      dispatch(setOrderNow(orderData));
    };
    getData();
  }, [dispatch, orderId]);
  const { products, status, totalMoney, payment, createdAt } = orderData;
  const { username, phoneNumber, address, addressDetail } = account;
  if (isEmpty(orderData)) return null;
  return (
    <main className='mx-[10rem]  my-10'>
      <Heading className='py-10'>Đơn hàng #{orderId}</Heading>
      <div className='flex gap-x-10'>
        <div className='rounded-lg grid grid-cols-1 gap-y-3 flex-1 border p-8'>
          <h3>Thông tin nhận hàng</h3>
          <h5>{username}</h5>
          <p>{phoneNumber}</p>
          <p>
            Địa chỉ giao hàng tại : {address}
            <br />
          </p>
          <p>{addressDetail}</p>
        </div>
        <div className='rounded-lg flex flex-col gap-y-2 flex-1 border p-8'>
          <h3>Phương thức thanh toán</h3>
          {payment == 'online' ? (
            <p>Ví trả sau - Momo</p>
          ) : (
            <p>Thanh toán khi nhận hàng qua shipper (COD) </p>
          )}
          <h3 className='font-semibold text-2xl'>Trạng thái</h3>
          {status == 'pending' ? <p>Chưa thanh toán</p> : <p>Đã thanh toán</p>}
        </div>
      </div>
      <div className='flex mx-5 relative mt-10 justify-between after:w-full after:top-[40%] after:z-[-1] after:bg-semi after:h-3 after:absolute'>
        <div>
          <div className='w-[6rem] mx-auto bg-success center-both aspect-square mb-4 border-4 border-success rounded-full'>
            <i className='fa-solid text-white text-6xl fa-check' />
          </div>
        </div>
        <div>
          <div
            className={`w-[6rem] mx-auto ${
              orderData.status === 'accepted' ? 'bg-success' : 'bg-semi'
            }  center-both aspect-square mb-4 border-4 border-semi rounded-full`}
          >
            <i className='fa-solid text-white text-5xl fa-hand-holding-dollar' />
          </div>
        </div>
        <div>
          <div className='w-[6rem] mx-auto bg-semi center-both aspect-square mb-4 border-4 border-semi rounded-full'>
            <i className='fa-solid fa-box-open text-4xl text-white' />
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <div>
          {' '}
          <h5>Đã đặt hàng</h5>
          <p>{compareTime(createdAt)} minutes ago</p>
        </div>
        <h5>Xác nhận đơn hàng</h5>
        <h5>Hoàn tất</h5>
      </div>
      <div className='rounded-lg p-8 mt-10 border'>
        <h3>Đơn hàng</h3>
        <div>
          {/* <ProductCart />
          <ProductCart />
          <ProductCart /> */}
        </div>
        <div className='grid grid-cols-2 gap-y-3 row-auto mt-5'>
          <h5>Tổng giá trị đơn hàng</h5>
          <h4 className='text-end'>{totalMoney.toLocaleString('vi')}Đ</h4>

          <h5>Tổng thanh toán (đã bao gồm COD)</h5>
          <h3 className='font-bold text-end text-danger'>
            {totalMoney.toLocaleString('vi')}Đ
          </h3>
        </div>
      </div>
    </main>
  );
};

export default CheckOutOrder;
