import { useQuery } from '@tanstack/react-query';
import http from '../../services/http';
import Avatar from '../atoms/Avatar';
import { Link, useLocation } from 'react-router-dom';
import { memo, useEffect } from 'react';
import useShowElement from '../../hooks/useShowElement.jsx';

const AccountMe = () => {
  const [isVisible, toggleVisibility] = useShowElement();
  const { data, isSuccess } = useQuery({
    queryKey: ['accountMe'],
    queryFn: async () => {
      return http.get('auth/login/success');
    },
    // enabled: false,
  });
  const handleLogOut = () => {
    window.open('http://localhost:5000/api/v1/auth/logout', '_self');
    localStorage.removeItem('account');
  };
  if (isSuccess) {
    const { username, photo } = data.data.account;
    localStorage.setItem('account', JSON.stringify({ username, photo }));
  }
  const accountJson = localStorage.getItem('account');
  const accountMe =
    accountJson === 'undefined' ? undefined : JSON.parse(accountJson);
  console.log('🚀 ~ accountMe:', accountMe);
  const { pathname } = useLocation();
  useEffect(() => {
    if (isVisible === true) toggleVisibility();
  }, [pathname]);
  return (
    <div className='lg:hidden'>
      {accountMe ? (
        <div className='account_info relative sm:block group border-b lg:border-0'>
          <div
            onClick={toggleVisibility}
            className='lg:flex cursor-pointer items-center hidden gap-x-3'
            to='/me/account'
          >
            <Avatar imgUrl={accountMe?.photo?.url} />
            <h5 className='border-b-2 hidden lg:block border-primary pb-1'>
              {accountMe.username}
            </h5>
          </div>

          <div
            onClick={toggleVisibility}
            className='account_sub flex justify-between items-center cursor-pointer text-2xl font-bold py-4 px-8  lg:hidden'
          >
            <li className='text-primary'>{accountMe.username}</li>
            <i
              className={`fa-solid delay-200 transition-all duration-500 text-3xl fa-chevron-down ${
                isVisible ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>

          <nav className='w-full lg:hidden lg:absolute  font-semibold px-8 lg:px-0 rounded-md text-2xl text-primary whitespace-nowrap'>
            <ul
              className={`transition-all lg:rounded-md lg:shadow-md lg:border lg:border-primary lg:bg-white duration-200 font-semibold overflow-hidden ${
                isVisible
                  ? 'opacity-100  visible'
                  : 'h-0 lg:h-fit opacity-0 invisible '
              }`}
            >
              <li className='rounded-md py-4 lg:p-4 lg:hover:bg-semi'>
                <Link onClick={toggleVisibility} to='/me/account'>
                  Thông tin cá nhân
                </Link>
              </li>
              <li className='rounded-md lg:hover:bg-semi py-4 lg:p-4'>
                <Link onClick={toggleVisibility} to='/me/order'>
                  Danh sách đơn hàng
                </Link>
              </li>
              <li className='bg-primary hidden lg:block h-[1px]' />
              <li
                className='rounded-md lg:hover:bg-semi  box-border lg:p-4  py-4'
                onClick={handleLogOut}
              >
                <Link onClick={toggleVisibility}>Đăng xuất</Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <Link
          to='/sign-in'
          className='text-2xl lg:hidden block px-8 py-4 font-bold text-primary'
        >
          Đăng nhập
        </Link>
      )}
    </div>
  );
};

export default memo(AccountMe);
