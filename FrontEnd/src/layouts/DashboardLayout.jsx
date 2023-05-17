import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { setAccount } from '../../redux/slices/accountSlice.jsx';
import http from '../services/http.js';
// import { isEmpty } from 'lodash';
/* eslint-disable react/prop-types */
const DashboardLayout = () => {
  const listNav = [
    {
      url: 'dashboard',
      title: 'Dashboard',
      icon: <i className='fa-solid fa-house' />,
    },
    {
      url: 'product',
      title: 'Products',
      icon: <i className='fa-solid fa-rocket' />,
    },
    {
      url: 'account',
      title: 'Accounts',
      icon: <i className='fa-solid fa-user' />,
    },
    {
      url: 'category',
      title: 'Categories',
      icon: <i className='fa-brands fa-microsoft' />,
    },
    {
      url: 'order',
      title: 'Orders',
      icon: <i className='fa-solid fa-bag-shopping' />,
    },
    {
      url: 'coupon',
      title: 'Coupons',
      icon: <i className='fa-solid fa-code' />,
    },
  ];
  const dispatch = useDispatch();
  const account = useSelector((value) => value.account.account);
  const navigate = useNavigate();

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
    } else {
      navigate('/page404');
    }
  }, [dispatch, navigate]);

  return (
    <div
      id='dashboard'
      className='flex overflow-y-auto bg-alice h-[100vh] w-[100vw]'
    >
      <div className='bg-primary sticky top-0 shadow-2xl flex w-[15vw] flex-col justify-between h-[100vh]'>
        <div>
          <Link to='/' className='bg-white block p-5'>
            <img
              className='w-full
          '
              src='/public/Logomain1.png'
              alt=''
            />
          </Link>
          <nav
            id='nav-admin'
            className='flex flex-col mt-10 text-2xl pr-5 text-white font-bold
        '
          >
            {listNav.map((nav) => (
              <NavLink
                end
                to={nav.url}
                className='center-cross block transition-all gap-x-5 ml-7'
                key={uuidv4()}
              >
                <span className='gap-x-4 p-4 flex'>
                  <span className='w-[2rem]'>{nav.icon}</span>
                  <span>{nav.title}</span>
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className='text-2xl w-auto mx-4 text-danger mb-10 font-bold cursor-pointer  bg-white center-both gap-x-5 py-5 rounded-2xl'>
          <i className='fa-solid fa-arrow-right-from-bracket' />
          <span>Log out</span>
        </div>
      </div>
      <div className='w-[85vw] p-10 bg-graySemi'>
        <header className='center-cross flex-1 bg-white py-5 px-14 mb-10 rounded-2xl shadow-lg justify-between'>
          <h2 className='text-4xl text-primary font-bold'>
            Welcome back, {account.username} 👋
          </h2>
          <div className='flex items-center text-4xl text-primary gap-x-10'>
            <i className='fa-regular cursor-pointer fa-bell' />
            <i className='fa-solid cursor-pointer fa-gear' />
            <img
              className='w-16 p-1 border-2 cursor-pointer rounded-full border-danger'
              src={account.photo?.url}
              alt=''
            />
          </div>
        </header>
        <div className='flex'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
