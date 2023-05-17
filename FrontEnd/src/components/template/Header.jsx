import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InputSearch from '@components/molecules/InputSearch';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import http from '../../services/http.js';
import { setAccount } from '../../../redux/slices/accountSlice.jsx';
import Button from '../atoms/Button';
import _, { isEmpty } from 'lodash';
import Avatar from '../atoms/Avatar';
import {
  setNumber,
  setProducts,
  setTotalPrice,
} from '../../../redux/slices/cartSlice';

const Header = () => {
  const dispatch = useDispatch();
  const numberProductCart = useSelector((value) => value.cart.number);
  const account = useSelector((value) => value.account.account);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await http.get('accounts/me');
        const accountMe = response.data.data;
        dispatch(setAccount(accountMe));
      } catch (err) {
        console.log(err);
      }
    };
    if (document.cookie.indexOf('jwt') >= 0) {
      getData();
    }
  }, [dispatch]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await http.get('carts/me');
        const cartData = response.data.data;
        if (!isEmpty(cartData)) {
          dispatch(setNumber(cartData.products.length));
          dispatch(setProducts(cartData.products));
          dispatch(setTotalPrice(cartData.totalPrice));
        }
      } catch (error) {
        console.log('🚀 ~ error:', error);
      }
    };
    if (document.cookie.indexOf('jwt') >= 0) {
      getData();
    }
  }, [dispatch, numberProductCart]);
  const menuLinks = [
    {
      url: '/',
      title: 'Trang chủ',
    },
    {
      url: '/product',
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
  return (
    <header className='px-16 py-5  bg-white text-primary shadow-md center-cross'>
      <div className='text-center mr-10'>
        <Link to='/'>
          <img
            src='/public/LogoMain1.png
  '
            alt=''
            className='logo w-[10rem] filter'
          />
        </Link>
      </div>
      <nav className='flex gap-x-10'>
        {menuLinks.map((link) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'active-menu after:bg-primary text-2xl font-bold'
                : 'text-2xl font-bold'
            }
            key={uuidv4()}
            to={link.url}
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
      <div className='flex justify-end flex-[2_2_0%] gap-x-11'>
        <InputSearch />
        <div className='center-cross gap-x-[4rem]'>
          <div className='center-cross gap-x-3'>
            <i className='text-4xl fa-solid fa-house-flag' />
            <span className='text-xl font-semi font-semibold max-w-[8rem]'>
              HỆ THỐNG CỦA HÀNG
            </span>
          </div>
          <span className='relative'>
            <Link to='/cart-preview'>
              <i className='text-4xl cursor-pointer fa-solid fa-cart-shopping' />
            </Link>
            {numberProductCart > 0 ? (
              <span className='absolute block w-8 h-8 font-bold border rounded-full bottom-5 left-8 center-both bg-secondary'>
                {numberProductCart}
              </span>
            ) : null}
          </span>

          {!_.isEmpty(account) ? (
            <Link to='/me/account'>
              <Avatar imgUrl={account?.photo?.url} />
            </Link>
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
      </div>
    </header>
  );
};
export default memo(Header);
