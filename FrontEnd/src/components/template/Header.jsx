import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useShowElement from '../../hooks/useShowElement';
import { SwipeableDrawer } from '@mui/material';
import ButtonIcon from '../atoms/ButtonIcon';
import InputSearch from '../molecules/InputSearch';
import Avatar from '../atoms/Avatar';
import { getAccountMe } from '../../services/AccountApi';
import { useQuery } from '@tanstack/react-query';
import AccountMe from '../organisms/AccountMe';
import { getCookieValue, getLocalValue } from '../../utils/common';
import { debounce } from 'lodash';

const Header = () => {
  const payload = getCookieValue('payload');
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsLargeScreen(window.innerWidth >= 1024);
    }, 300);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      toggleDrawer('left', false)();
    };
  }, [isLargeScreen]);

  const [state, setState] = useState({
    left: false,
  });
  const { data, isSuccess } = useQuery({
    queryKey: ['accountMe'],
    queryFn: () => {
      return getAccountMe();
    },
    retry: 0,
    enabled: Boolean(payload),
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [isShowSearch, toggleVisibility, setShowSearch] = useShowElement();
  const { pathname } = useLocation();
  useEffect(() => {
    toggleDrawer('left', false)();
    if (isShowSearch === true) {
      setShowSearch(false);
    }
  }, [pathname]);
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

  if (isSuccess) {
    const { username, photo } = data.data.data;
    localStorage.setItem('accountMe', JSON.stringify({ username, photo }));
  } else {
    localStorage.removeItem('accountMe');
  }

  const handleLogOut = () => {
    localStorage.removeItem('accountMe');
    window.open(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/logout`,
      '_self',
    );
  };

  const accountMe = getLocalValue('accountMe');
  const numberProductCart = 4;
  return (
    <>
      <header
        id='header'
        className='px-8 sm:px-14  lg:px-[3rem] py-5 w-full bg-white text-primary items-center z-50 relative gap-x-10 grid'
      >
        <nav
          id='header_nav'
          className='col-row-span-1 lg:col-span-3 justify-self-start '
        >
          <ul className='flex gap-x-5'>
            <li className='lg:hidden'>
              <i
                onClick={toggleDrawer('left', true)}
                className='fa-solid text-3xl fa-bars cursor-pointer lg:hidden'
              />
            </li>
            <li className=' lg:hidden relative'>
              {isShowSearch || (
                <span className='text-primary cursor-pointer absolute top-0 left-0'>
                  <i
                    onClick={toggleVisibility}
                    className='fa-solid text-3xl  fa-magnifying-glass'
                  />
                </span>
              )}
              {isShowSearch && (
                <span className='text-primary cursor-pointer absolute top-0 left-0'>
                  <i
                    onClick={toggleVisibility}
                    className='fa-solid text-4xl fa-xmark'
                  />
                </span>
              )}
            </li>
            {menuLinks.map((link) => (
              <li
                className='hidden lg:block whitespace-nowrap xl:text-2xl px-8 lg:py-0 border-gray lg:border-b-0 lg:px-0 xl:px-4 text-[1.4rem] font-bold'
                key={uuidv4()}
              >
                <NavLink
                  onClick={toggleVisibility}
                  className={({ isActive }) =>
                    isActive ? 'sm:active-menu lg:after:bg-primary' : ''
                  }
                  to={link.url}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          className='col-row-span-1 header_logo justify-self-center lg:justify-self-start lg:order-first'
          to='/'
        >
          <img
            src='/public/LogoMain1.png
  '
            alt=''
            className='min-w-[8rem] max-w-[10rem] hidden lg:block'
          />
          <img
            src='/public/logo_mobile.png
  '
            alt=''
            className='w-[8rem] lg:hidden'
          />
        </Link>
        <div className='hidden lg:col-span-1 col-row-span-1 xl:block' />
        <div className='col-row-span-1 justify-self-end lg:col-span-3 lg:w-full'>
          <ul className='flex items-center gap-x-5 '>
            <li className='hidden lg:block lg:flex-1'>
              <InputSearch />
            </li>
            <li>
              {accountMe ? (
                <div
                  className='lg:flex cursor-pointer group items-center gap-x-3 relative'
                  to='/me/account'
                >
                  <div className='center-both gap-x-3 py-3'>
                    <Avatar imgUrl={accountMe?.photo?.url} />
                    <h5 className='border-b-2 hidden xl:block border-primary pb-1'>
                      {accountMe.username}
                    </h5>
                  </div>

                  <nav className='hidden xl:block w-fit transition-all absolute font-semibold rounded-md text-xl text-primary whitespace-nowrap top-full group-hover:opacity-100 opacity-0 visible group-hover:visible translate-y-10 group-hover:translate-y-0'>
                    <ul className='transition-all rounded-md  bg-white duration-200 font-semibold overflow-hidden p-1 shadow-inner'>
                      <li className='rounded-md py-3 p-4 hover:bg-semi'>
                        <Link to='/me/account'>Thông tin cá nhân</Link>
                      </li>
                      <li className='rounded-md hover:bg-semi py-3 p-4'>
                        <Link to='/me/order'>Danh sách đơn hàng</Link>
                      </li>
                      <li className='bg-primary block h-[1px]' />
                      <li
                        className='rounded-md hover:bg-semi box-border p-4  py-3 flex gap-x-3 items-center'
                        onClick={handleLogOut}
                      >
                        <i className='fa-solid fa-right-from-bracket' />
                        <Link>Đăng xuất</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              ) : (
                <Link to='/sign-in' className=''>
                  <i className='fa-solid text-4xl fa-circle-user' />
                </Link>
              )}
            </li>
            <li>
              <span className='header_cart lg:order-5 relative mr-4'>
                <Link to='/cart-preview'>
                  <i className='text-4xl cursor-pointer fa-solid fa-bag-shopping' />
                </Link>
                {numberProductCart && numberProductCart > 0 ? (
                  <span className='absolute block w-8 h-8 font-bold border border-semi rounded-full bottom-4 left-5 center-both bg-secondary text-xl'>
                    {numberProductCart}
                  </span>
                ) : (
                  0
                )}
              </span>
            </li>
          </ul>
        </div>
      </header>
      <SwipeableDrawer
        anchor='left'
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
        ModalProps={{
          keepMounted: false,
        }}
        PaperProps={{
          style: {
            width: '80vw',
          },
        }}
      >
        <div className='py-5 lg:py-0  duration-300 transition-all bg-white '>
          <ButtonIcon onClick={toggleDrawer('left', false)} className='mx-8'>
            <i className='fa-solid fa-xmark' />
          </ButtonIcon>

          <nav className='header_nav mt-3 flex flex-col'>
            {menuLinks.map((link) => (
              <NavLink
                className='text-2xl px-8 border-b py-4 border-gray font-bold text-primary'
                key={uuidv4()}
                to={link.url}
                onClick={toggleDrawer('left', false)}
              >
                {link.title}
              </NavLink>
            ))}
            <AccountMe />
          </nav>
        </div>
      </SwipeableDrawer>

      <div
        className={`absolute lg:hidden transition-all duration-500 w-full bg-white  z-10 items-center border-primary pb-5 px-8 ${
          isShowSearch
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full'
        }`}
      >
        <form
          className='relative top-0 left-0 w-full flex items-center border py-2'
          action=''
        >
          <input
            type='text'
            className='w-full text-2xl  pl-5 '
            placeholder='Search..'
          />
          <i className='fa-search fa-solid text-3xl right-0 px-3 text-primary cursor-pointer' />
        </form>
      </div>
    </>
  );
};
export default Header;
