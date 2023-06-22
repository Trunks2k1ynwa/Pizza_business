import Button from '../components/atoms/Button.jsx';
import { useSelector } from 'react-redux';
import TimePayment from '../components/molecules/TimePayment.jsx';
import { useParams } from 'react-router-dom';
import { convertDate } from '../utils/common';
import { isEmpty } from 'lodash';
import Breadcumb from '../components/organisms/Breadcumb.jsx';

const PaymentPage = () => {
  const { order } = useSelector((value) => value.order);
  const orderId = useParams().id;
  const totalMoney = order[order.length - 1]?.totalMoney;
  const createdAt = order[order.length - 1]?.createdAt;
  if (isEmpty(order)) return null;
  return (
    <main className='px-[30rem] py-10'>
      <div className='py-10'>
        <Breadcumb paths={['Payment', orderId]} />
      </div>
      <div className='grid grid-flow-col mb-5 grid-cols-3 grid-rows-4 gap-x-[3rem]'>
        <section className='p-6 flex flex-col row-span-3 col-span-1 gap-y-5 border-2 bg-slate-100  rounded-md mb-10'>
          <h3 className='font-bold'>Thông tin đơn hàng</h3>
          <div className='border-b py-3'>
            <h5 className='mb-2 text-slate-500'>Mã đơn hàng</h5>
            <h5>{orderId}</h5>
          </div>
          <div className='border-b py-3'>
            <h5 className='mb-2 text-slate-500'>Mô tả</h5>
            <h5>Process pays SWRIOAFB the bill at {convertDate(createdAt)}</h5>
          </div>
          <div className='border-b py-3'>
            <h5 className='mb-2 text-slate-500'>Số tiền</h5>
            <h1 className='text-3xl font-semibold'>
              {totalMoney.toLocaleString('vi')}đ
            </h1>
          </div>
        </section>
        <TimePayment />
        <section className='row-span-4 col-span-2'>
          <img className='h-full' src='/public/payment.png' alt='' />
        </section>
      </div>
      <Button
        to={`/order-checkout/${orderId}`}
        className='mt-10 bg'
        kind='small'
      >
        Quay về
      </Button>
    </main>
  );
};

export default PaymentPage;
