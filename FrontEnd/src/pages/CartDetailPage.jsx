/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Controller, useForm } from 'react-hook-form';
import Button from '../components/atoms/Button';
import Heading from '../components/atoms/Heading';
import Input from '../components/atoms/Input';
import Textarea from '../components/atoms/TextArea';
import ProductCart from '../components/organisms/ProductCart';
import Label from '../components/atoms/Label';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import Radio from '../components/atoms/Radio';
import { paymentStatus } from '../utils/constant.js';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import http from '../services/http.js';
import { addOrder } from '../../redux/slices/orderSlice';
import { setCart, setNumber, setProducts } from '../../redux/slices/cartSlice';
import PageNotFound from './PageNotFound.jsx';
import Breadcumb from '../components/organisms/Breadcumb.jsx';
const CartDetailPage = () => {
  const dispatch = useDispatch();
  const cartProduct = useSelector((value) => value.cart);
  const [loading, setLoading] = useState(false);
  const { products, totalPrice } = cartProduct;
  const account = useSelector((value) => value.account.account);
  const { handleSubmit, reset, control, watch } = useForm({
    defaultValues: {},
  });
  const navigate = useNavigate();
  useEffect(() => {
    reset(account && account);
  }, [account, reset]);

  const handleInfoPayment = async (value) => {
    setLoading((loading) => !loading);
    const cloneValue = { account: value._id };
    cloneValue.products = cartProduct.products;
    if (Number(watchStatus) == paymentStatus.SHIPPING) {
      cloneValue.payment = 'shipping';
      cloneValue.totalMoney = totalPrice + 30000;
    } else {
      cloneValue.payment = 'online';
      cloneValue.totalMoney = totalPrice;
    }

    const { phoneNumber, username, address, addressDetail } = value;
    try {
      // Tạo đơn hàng
      const response = await http.post('orders', {
        ...cloneValue,
      });
      const dataOrder = response.data.data.data;

      //Cập nhật đơn hàng vào lịch sử đơn hàng
      const dataAccount = await http.patch('accounts/me', {
        phoneNumber,
        username,
        address,
        addressDetail,
        orderId: dataOrder._id,
      });

      //Xóa giỏ hàng
      const dataCart = await http.delete('carts/me');

      if (dataOrder && dataAccount && dataCart) {
        dispatch(setNumber(0));
        dispatch(setCart(''));
        dispatch(setProducts([]));
        dispatch(addOrder(dataOrder));
        setLoading(false);
        toast.success('Chúc mừng bạn đã đặt hàng thành công', {
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            background: '#28A745',
          },
        });
        if (Number(watchStatus) == paymentStatus.ONLINE) {
          navigate(`/gateway/payment/${dataOrder._id}`);
        } else {
          navigate(`/order-checkout/${dataOrder._id}`);
        }
      }
    } catch (err) {
      setLoading(false);
      toast.error(`Có lỗi khi thực hiện chức năng`, {
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#fa6464',
          background: '#fa6464,',
        },
      });
      console.log(err);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const response = await http.get('carts/me');
      const products = response?.data?.data?.products;
      dispatch(setProducts(products));
    };
    getData();
  }, [dispatch]);
  const watchStatus = watch('payment');
  if (document.cookie.indexOf('jwt') === -1) {
    return <PageNotFound />;
  }
  if (isEmpty(account)) return null;

  return (
    <main className='mx-[10rem] my-10'>
      <div className='py-10'>
        <Breadcumb paths={['Cart']} />
      </div>
      <Toaster />
      <form onSubmit={handleSubmit(handleInfoPayment)}>
        <Heading className='py-5'>Thông tin thanh toán</Heading>
        <div className='grid grid-cols-2 gap-x-10'>
          <div className='h-fit p-10 border-2 border-semi rounded-xl'>
            <h3 className='font-bold mb-10'>Thông tin người mua</h3>
            <div className='grid grid-cols-6 gap-x-7 gap-y-7'>
              <Input
                control={control}
                name='username'
                className='col-span-3'
                placeholder='username'
              />
              <Input
                control={control}
                name='phoneNumber'
                className='col-span-3'
                placeholder='Số điện thoại'
                required
                minLength='10'
                maxLength='10'
              />
              <Input
                control={control}
                name='email'
                className='col-span-6'
                type='email'
                placeholder='email'
              />
              <Input
                control={control}
                name='address'
                className='col-span-6'
                placeholder='Nhập địa chỉ (Ví dụ:72 Tu Hoàng)'
                required
                minLength='5'
              />

              <Textarea
                className='col-span-6'
                name='addressDetail'
                placeholder='Ghi chú thêm (Ví dụ: Giao giờ hành chính)'
                required
                control={control}
                minLength='5'
              />
            </div>
          </div>
          <div className='p-10 border-2 row-span-2 border-semi rounded-xl shadow-2xl'>
            <h3 className='font-bold mb-10'>Giỏ hàng của bạn</h3>
            {isEmpty(products) ? (
              <div>
                <img className='w-full' src='/public/cartEmpty.jpg' alt='' />
                <div className='flex flex-col justify-center items-center gap-y-5 px-10'>
                  <h4 className='font-bold text-center text-danger'>
                    Rất tiếc! Giỏ hàng của bạn hiện tại đang rỗng!
                  </h4>
                  <p className='text-center text-sky-300 font-medium text-3xl'>
                    Có vẻ như bạn chưa đăng nhập hoặc bạn đã đăng nhập nhưng
                    chưa thêm sản phẩm vào giỏ hàng
                  </p>
                  <Button to='/'>Mua sắm</Button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  {products &&
                    products.map((product) => (
                      <ProductCart product={product} key={uuidv4()} />
                    ))}
                </div>
                <div className='grid grid-cols-2 gap-y-3 row-auto mt-5'>
                  <h5>Tổng giá trị đơn hàng</h5>
                  <h4 className='text-end'>
                    {totalPrice?.toLocaleString('vi')}Đ
                  </h4>
                  {Number(watchStatus) == paymentStatus.SHIPPING ? (
                    <>
                      <h5>Phí giao hàng</h5>
                      <h4 className='text-end'>30.000Đ</h4>
                    </>
                  ) : null}
                  <h5>Tổng thanh toán</h5>
                  <h3 className='font-bold text-end text-danger'>
                    {Number(watchStatus) == paymentStatus.SHIPPING
                      ? (totalPrice + 30000)?.toLocaleString('vi')
                      : totalPrice?.toLocaleString('vi')}
                    Đ
                  </h3>
                  <div className='w-full col-span-2 h-auto flex flex-col justify-end'>
                    {!loading ? (
                      <Button type='submit' className='w-full mt-3'>
                        Đặt hàng
                      </Button>
                    ) : (
                      <Button
                        disabled={true}
                        type='submit'
                        className='w-full mt-3'
                      >
                        <div className='loader'></div>
                        <span>Loading</span>
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='p-10 mt-10 border-2 border-semi rounded-xl shadow-2xl'>
            <h3 className='font-bold mb-10'>Phương thức thanh toán</h3>
            <div className=' mb-5 center-cross justify-between gap-x-3 p-5 border-2 rounded-md'>
              <div className='center-cross w-full justify-between'>
                <div className='center-cross'>
                  <Radio
                    name='payment'
                    control={control}
                    checked={Number(watchStatus) === paymentStatus.ONLINE}
                    value={paymentStatus.ONLINE}
                    required
                  />
                  <Label htmlFor='bank'>Thanh toán online</Label>
                </div>
                <img
                  className='w-28'
                  src='https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png'
                  alt=''
                />
              </div>
            </div>
            <div className=' mb-5 center-cross justify-between gap-x-3 p-5 border-2 rounded-md'>
              <div className='center-cross w-full justify-between'>
                <div className='center-cross'>
                  <Radio
                    name='payment'
                    control={control}
                    checked={Number(watchStatus) === paymentStatus.SHIPPING}
                    value={paymentStatus.SHIPPING}
                    required
                  />

                  <Label htmlFor='money'>
                    Trả tiền mặt khi nhận hàng (COD)
                  </Label>
                </div>
                <img
                  className='w-14 '
                  src='https://www.vhv.rs/dpng/d/546-5464937_cash-payment-icon-cash-money-icon-png-transparent.png'
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CartDetailPage;
