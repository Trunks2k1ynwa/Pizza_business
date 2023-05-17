import { useState } from 'react';
import { memo, useEffect } from 'react';

const TimePayment = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 27);
  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  // const displayTime = `${minutes < 10 ? '0' : ''}${minutes}:${
  //   seconds < 10 ? '0' : ''
  // }${seconds}`;
  return (
    <div className='bg-pink-100 w-full row-span-1 col-span-1 rounded-md p-6 flex flex-col justify-center'>
      <h5 className='text-center mb-4 text-pink-400'>
        Đơn hàng sẽ hết hạn sau
      </h5>
      <div className='flex max-w-[30rem] gap-x-2 justify-center'>
        <div className='w-min font-bold text-center rounded-md text-2xl text-pink-400 bg-[#f3d4e6] p-2'>
          <b className='text-3xl'>{minutes}</b> phút
        </div>
        <div className='w-min font-bold text-center rounded-md text-2xl text-pink-400 bg-[#f3d4e6] p-2'>
          <b className='text-3xl'>{seconds}</b> giây
        </div>
      </div>
    </div>
  );
};

export default memo(TimePayment);
