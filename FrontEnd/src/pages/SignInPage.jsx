/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { memo, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { showAlert } from '../../alerts.js';
import { useDispatch } from 'react-redux';
import {
  QueryClient,
  useIsFetching,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button.jsx';
import { Link } from 'react-router-dom';
import http from '../services/http.js';
import { result } from 'lodash';

const SignInPage = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async () => {
    // try {
    //   const response = await http.post('accounts/login', data);
    //   const { token } = response.data;
    //   const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000 * 60); // Hết hạn sau 60 giờ
    //   document.cookie = `jwt=${token}; expires=${expirationTime.toUTCString()}; path=/`;
    //   const account = response.data.data.user;
    //   const getData = async () => {
    //     try {
    //       const response = await http.get('accounts/me', {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //       const accountMe = response.data;
    //       dispatch(setAccount(accountMe.data));
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   getData();
    //   dispatch(setAccount({ token, ...account }));
    //   if (response.data.status === 'success') {
    //     showAlert('success', 'Đăng nhập tài khoản thành công!');
    //     window.setTimeout(() => {
    //       navigate('/');
    //     }, 1000);
    //   }
    // } catch (error) {
    //   showAlert('error', 'Email hoặc mật khẩu chưa chính xác! ');
    // }
    // reset();
  };

  return (
    <section className='center-main text-primary h-[95vh]'>
      <div className=' center-both px-[4rem] flex-[3_3_0%]'>
        <img className='bg-cover' src='/public/Loginuser1.png' alt='' />
      </div>
      <div className='flex-[2_2_0%] bg-primaryF4 bg-cover backdrop-blur-xl flex flex-col justify-center'>
        <div className='text-left px-[15%] my-10'>
          <h2 className='font-bold text-4xl'>👋 Chào bạn</h2>
          <p className='text-2xl'>
            Vui lòng điền đầy đủ thông tin bên dưới để đăng ký tài khoản nha
          </p>
        </div>
        <div className='center-both'>
          <form className='w-[70%]' onSubmit={handleSubmit(onSubmit)} action=''>
            <div className='mb-5'>
              <label className='block mb-3 font-bold text-3xl' htmlFor='email'>
                Email
              </label>
              <input
                placeholder='Email đăng nhập'
                className={`border text-2xl placeholder:font-normal font-semibold w-full p-4 px-6 shadow-md rounded-lg ${
                  errors.email ? 'border-danger' : ''
                }`}
                id='email'
                {...register('email', { required: true })}
                type='email'
              />
              {errors.email && (
                <span className='text-danger text-xl font-semibold mt-2 block'>
                  Bạn chưa điền thông tin email
                </span>
              )}
            </div>
            <div className='mb-5'>
              <label className='block mb-3 font-bold text-3xl' htmlFor=''>
                Password
              </label>
              <input
                placeholder='Mật khẩu của bạn'
                {...register('password', { required: true, minLength: 4 })}
                className={`border text-2xl placeholder:font-normal font-semibold w-full p-4 px-6 shadow-md rounded-lg ${
                  errors.password ? 'border-danger' : ''
                }`}
                type='password'
              />
              {errors.password && (
                <span className='text-danger text-xl font-semibold mt-2 block'>
                  Bạn chưa điền mật khẩu
                </span>
              )}
            </div>
            <div className='text-right'>
              <Link className='text-2xl hover:text-primary text-gray-400 font-semibold underline text-right'>
                Quên mật khẩu
              </Link>
            </div>
            <Button className='w-full my-5' type='submit'>
              Đăng nhập
            </Button>
            <div className='text-center'>
              <label htmlFor=''>Hoặc</label>
            </div>
            <Button className='w-full my-5 bg-white'>
              <i className='fa-brands mx-5 fa-google' />
              <label htmlFor=''>Google</label>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default memo(SignInPage);
