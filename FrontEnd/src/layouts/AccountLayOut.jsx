// import { isEmpty } from 'lodash';
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import { useEffect } from 'react';

const AccountLayOut = () => {
  return (
    <main className='flex'>
      <div className='flex my-[4rem] w-full'>
        <section className='bg-primary shadow-lg rounded-md sticky top-0  flex w-[18vw] py-10 flex-col justify-between'>
          <nav
            id='nav-account'
            className='flex flex-col mt-10 text-2xl pr-5 text-white font-bold'
          >
            <NavLink
              end
              to='/me/account'
              className='center-cross block  gap-x-5 ml-7'
            >
              <span className='p-4'>Tài khoản của tôi</span>
            </NavLink>
            <NavLink
              end
              to='/me/order'
              className='center-cross block  gap-x-5 ml-7'
            >
              <span className='p-4'>Đơn hàng của tôi</span>
            </NavLink>
            <NavLink
              end
              to='/me/address'
              className='center-cross block  gap-x-5 ml-7'
            >
              <span className='p-4'>Địa chỉ của tôi</span>
            </NavLink>
          </nav>
        </section>
        <div className='bg-slate-200 shadow-lg py-16 px-[15rem] rounded-md flex-1'>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AccountLayOut;
