/* eslint-disable no-unused-vars */

import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { showAlert } from '../../alerts.js';
import { useDispatch } from 'react-redux';
import { useMutation, useQueries } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button.jsx';
import { Link } from 'react-router-dom';
import http from '../services/http.js';

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const { data, mutate } = useMutation({
    mutationFn: (data) => {
      return http.post('accounts/login', data);
    },
    onSuccess: (data, variables, context) => {
      showAlert('success', 'Đăng nhập tài khoản thành công!');
      const { token, account } = data.data;
      window.setTimeout(() => {
        navigate('/');
      }, 1000);
    },
    onError: (error, variables, context) => {
      showAlert('error', 'Email hoặc mật khẩu chưa chính xác! ');
    },
    onSettled: (data, error, variables, context) => {
      reset();
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };
  const handleLoginGoogle = () => {
    window.open('http://localhost:5000/api/v1/auth/google', '_self');
  };
  const handleLoginFacebook = () => {
    window.open('http://localhost:5000/api/v1/auth/facebook', '_self');
  };
  return (
    <section className='center-main text-primary h-[90vh]'>
      <div className=' center-both px-[6rem] flex-[3_3_0%]'>
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
            <div className='text-center text-xl'>
              <label htmlFor=''>Hoặc đăng nhập với</label>
            </div>
            <div className='flex gap-x-4 my-5'>
              <Button
                onClick={handleLoginGoogle}
                kind='google'
                className='w-full flex justify-left items-center'
              >
                <i className='fa-brands mx-5 fa-google' />
                <label className='cursor-pointer h-4' htmlFor=''>
                  Google
                </label>
              </Button>
              <Button
                onClick={handleLoginFacebook}
                kind='facebook'
                className='w-full flex justify-left items-center'
              >
                <i className='fa-brands mx-5 fa-square-facebook' />
                <label className='h-4 cursor-pointer' htmlFor=''>
                  Facebook
                </label>
              </Button>
            </div>
            <div className='text-center text-xl'>
              <label htmlFor=''>
                Nếu chưa có tài khoản ?{' '}
                <Link className='font-bold' to='/sign-up'>
                  Đăng ký
                </Link>
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default memo(SignInPage);
