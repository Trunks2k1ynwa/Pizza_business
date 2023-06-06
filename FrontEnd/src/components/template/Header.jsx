import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InputSearch from '@components/molecules/InputSearch';
import http from '../../services/http.js';
import Button from '../atoms/Button';
import Avatar from '../atoms/Avatar';

import { useQuery } from '@tanstack/react-query';

const Header = () => {
  const menuLinks = [
    {
      url: '/',
      title: 'Trang chủ',
    },
    {
      url: '/products',
      title: 'Sản phẩm',
    },
    {
      url: '/contact',
      title: 'Liên hệ',
    },
    {
      url: '/about',
      title: 'Về chúng tôi',
    },
  ];
  const handleLogOut = () => {
    window.open('http://localhost:5000/api/v1/auth/logout', '_self');
    localStorage.removeItem('account');
  };
  // const { data, isSuccess } = useQuery({
  //   queryKey: ['accountMe'],
  //   queryFn: async () => {
  //     return http.get('accounts/me');
  //   },
  // });
  const { data, isSuccess } = useQuery({
    queryKey: ['accountMe'],
    queryFn: async () => {
      return http.get('auth/login/success');
    },
  });
  if (isSuccess) {
    const { username, photo } = data.data.account;
    localStorage.setItem('account', JSON.stringify({ username, photo }));
  }
  const accountJson = localStorage.getItem('account');
  const accountMe =
    accountJson === 'undefined' ? undefined : JSON.parse(accountJson);
  console.log('🚀 ~ accountMe:', accountMe);

  return (
    <header className='px-16 py-5 fixed top-0 w-full bg-white text-primary shadow-md center-cross z-50'>
      <Link className='header_logo text-center mr-10' to='/'>
        <img
          src='/public/LogoMain1.png
  '
          alt=''
          className='logo w-24 md:w-[10rem] filter'
        />
      </Link>
      <nav className='header_nav flex gap-x-10'>
        {menuLinks.map((link) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'active-menu after:bg-primary text-2xl font-bold'
                : 'text-2xl opacity-80 hover:opacity-100 bg-transparent hover:after:bg-primary font-bold'
            }
            key={uuidv4()}
            to={link.url}
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
      <div className='header_feature flex justify-end flex-[2_2_0%] gap-x-12 items-center'>
        <InputSearch />
        <span className='relative'>
          <Link to='/cart-preview'>
            <i className='text-4xl cursor-pointer fa-solid fa-bag-shopping' />
          </Link>
          {/* {numberProductCart && numberProductCart > 0 ? (
            <span className='absolute block w-8 h-8 font-bold border rounded-full bottom-5 left-8 center-both bg-secondary'>
              {numberProductCart}
            </span>
          ) : null} */}
        </span>

        {accountMe ? (
          <div className='relative group'>
            <Link className='flex items-center gap-x-3' to='/me/account'>
              <Avatar imgUrl={accountMe?.photo?.url} />
              <h5 className='border-b-2 border-primary pb-1'>
                {accountMe.username}
              </h5>
            </Link>
            <nav className='absolute group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-4 group-hover:translate-y-0 opacity-0 invisible bg-white right-0 rounded-md shadow-shadow2 text-2xl p-2 text-primary  whitespace-nowrap overflow-hidden'>
              <ul className='font-semibold '>
                <li className='rounded-md px-6 hover:bg-semi py-4'>
                  <Link to='/me/account'>Thông tin cá nhân</Link>
                </li>
                <li className='hover:bg-semi rounded-md px-6 py-4'>
                  <Link to='/me/order'>Danh sách đơn hàng</Link>
                </li>
                <li className='bg-primary h-[1px]' />
                <li
                  className='hover:bg-semi rounded-md  box-border px-6 py-4'
                  onClick={handleLogOut}
                >
                  <Link>Đăng xuất</Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div className='flex gap-x-3'>
            <Button kind='small' to='/sign-in'>
              Đăng nhập
            </Button>
            <Button kind='small' to='/sign-up'>
              Đăng ký
            </Button>
          </div>
        )}
      </div>
      <div className='sm:hidden'>
        <i className='fa-solid text-4xl fa-bars' />
      </div>
    </header>
  );
};
export default memo(Header);
