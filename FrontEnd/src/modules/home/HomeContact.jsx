import { memo } from 'react';

const HomeContact = () => {
  return (
    <section
      id='avatar_200'
      className="text-white lg:flex-row bg-cover bg-[url('https://images.unsplash.com/photo-1473773508845-188df298d2d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')] flex-col gap-6 justify-center  flex gap-x-[17rem] px-[4rem] center-cross py-[4rem] bg-center shadow-md"
    >
      <div className='text-center lg:flex-end lg:text-left text-slate-900'>
        <h2 className='text-3xl text-semi font-bold uppercase'>
          nhận bản tin làm đẹp
        </h2>
        <p className='text-2xl text-semi font-bold'>
          Đừng bỏ lỡ hàng ngàn sản phẩm và khuyến mãi siêu hấp dẫn
        </p>
      </div>
      <div className='relative lg:w-[30%] w-full md:w-[60%]'>
        <input
          className=' block w-full shadow-md focus:text-primary font-bold text-xl py-5 px-10 rounded-full bg-primaryF4'
          placeholder='Điền email của bạn'
          type='text'
        />
        <button className='absolute z-1 top-[35%] text-xl font-bold text-primary right-[3rem]'>
          ĐĂNG KÝ
        </button>
      </div>
    </section>
  );
};

export default memo(HomeContact);
