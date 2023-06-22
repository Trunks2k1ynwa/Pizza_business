import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { showAlert } from '../../alerts.js';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button.jsx';
import { Link } from 'react-router-dom';
import { signInAccount } from '../services/AccountApi';
import { useDispatch } from 'react-redux';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
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
  const { mutate } = useMutation({
    mutationFn: (data) => {
      return signInAccount(data);
    },
    onSuccess: (data) => {
      showAlert('success', 'Đăng nhập tài khoản thành công!');
      const { token, account } = data.data;
      console.log('🚀 ~ token:', token);
      const { username, photo } = account;
      console.log('🚀 ~ account:', account);
      localStorage.setItem('accountMe', JSON.stringify({ username, photo }));
      window.setTimeout(() => {
        navigate('/');
      }, 1000);
    },
    onError: () => {
      showAlert('error', 'Email hoặc mật khẩu chưa chính xác! ');
    },
    onSettled: () => {
      reset();
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  const handleLoginSocial = async (socialName) => {
    window.open(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/${socialName}`,
      '_self',
    );
    if (socialName === 'google') {
      setLoadingGoogle(true);
    } else {
      setLoadingFacebook(true);
    }
  };
  const handleSaga = () => {
    dispatch({ type: 'getAccountMe', payload: 'trung' });
  };
  return (
    <section className='center-main text-primary px-8 sm:px-14 md:px-20 lg:h-[90vh] lg:px-[3rem] my-10 '>
      <div className='hidden lg:block lg:pr-[6rem] flex-[3_3_0%] self-center'>
        <img className='bg-cover' src='/public/Loginuser1.png' alt='' />
      </div>
      <div className='lg:flex-[2_2_0%] flex-1 bg-primaryF4 bg-cover backdrop-blur-xl flex flex-col justify-center'>
        <div className='text-left my-10'>
          <h2 className='font-bold text-4xl'>👋 Chào bạn</h2>
          <p className='text-2xl'>
            Vui lòng điền đầy đủ thông tin bên dưới để đăng ký tài khoản nha
          </p>
        </div>
        <div className='center-both lg:px-0'>
          <form className=' w-full' onSubmit={handleSubmit(onSubmit)} action=''>
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
            <div className='flex lg:flex-col lg:gap-y-4 xl:flex-row gap-x-4 my-5'>
              <Button
                onClick={() => handleLoginSocial('google')}
                kind='google'
                className='w-full items-center border justify-center gap-x-5'
                disabled={loadingGoogle}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='30'
                  height='30'
                  viewBox='0 0 48 48'
                >
                  <path
                    fill='#fbc02d'
                    d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                  ></path>
                  <path
                    fill='#e53935'
                    d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                  ></path>
                  <path
                    fill='#4caf50'
                    d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                  ></path>
                  <path
                    fill='#1565c0'
                    d='M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                  ></path>
                </svg>
                <div className='cursor-pointer h-4 text-gray-500 ' htmlFor=''>
                  <label
                    className='hidden sm:block lg:hidden cursor-pointer'
                    htmlFor=''
                  >
                    Đăng nhập với Google
                  </label>
                  <label
                    className='sm:hidden lg:block cursor-pointer'
                    htmlFor=''
                  >
                    Google
                  </label>
                </div>
                {loadingGoogle && (
                  <div className='w-10 h-10 border-4 border-primary rounded-full animate-spin border-t-transparent absolute z-10' />
                )}
              </Button>
              <Button
                onClick={() => handleLoginSocial('facebook')}
                kind='facebook'
                className='w-full items-center justify-center gap-x-5 border'
                disabled={loadingFacebook}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='30'
                  height='30'
                  viewBox='0 0 48 48'
                >
                  <linearGradient
                    id='Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1'
                    x1='9.993'
                    x2='40.615'
                    y1='9.993'
                    y2='40.615'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0' stopColor='#2aa4f4'></stop>
                    <stop offset='1' stopColor='#007ad9'></stop>
                  </linearGradient>
                  <path
                    fill='url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)'
                    d='M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z'
                  ></path>
                  <path
                    fill='#fff'
                    d='M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z'
                  ></path>
                </svg>
                <div className='cursor-pointer h-4' htmlFor=''>
                  <label className='hidden sm:block lg:hidden' htmlFor=''>
                    Đăng nhập với Facebook
                  </label>
                  <label
                    className='sm:hidden lg:block cursor-pointer'
                    htmlFor=''
                  >
                    Facebook
                  </label>
                </div>
                {loadingFacebook && (
                  <div className='w-10 h-10 border-4 border-primary rounded-full animate-spin border-t-transparent absolute z-10' />
                )}
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
        <Button className='my-10' onClick={handleSaga}>
          Đăng nhập
        </Button>
      </div>
    </section>
  );
};

export default memo(SignInPage);
