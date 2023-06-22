import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { showAlert } from '../../alerts';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import { useMutation } from '@tanstack/react-query';
import { signUpAccount } from '../services/AccountApi';

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const { mutate } = useMutation({
    mutationFn: (data) => {
      return signUpAccount(data);
    },
    onSuccess: (data) => {
      showAlert('success', 'Đăng nhập tài khoản thành công!');
      const { token, account } = data.data;
      console.log('🚀 ~ token:', token);
      const { username, photo } = account;
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
  return (
    <section className='center-main text-primary px-8 sm:px-14 md:px-20 lg:h-[90vh] lg:px-[3rem] my-10 '>
      <div className='hidden lg:block lg:pr-[6rem] flex-[3_3_0%] self-center'>
        <img className='bg-cover' src='/public/Loginuser.png' alt='' />
      </div>
      <div className='lg:flex-[2_2_0%] flex-1 bg-primaryF4 bg-cover backdrop-blur-xl flex flex-col justify-center'>
        <div className='text-left my-10'>
          <h2 className='font-bold text-4xl'>👋 Chào bạn</h2>
          <p className='text-2xl'>
            Vui lòng điền đầy đủ thông tin bên dưới để đăng nhập tài khoản nha
          </p>
        </div>
        <div className='center-both lg:px-0'>
          <form className=' w-full' onSubmit={handleSubmit(onSubmit)} action=''>
            <div className='mb-5'>
              <label
                className='block mb-3 font-bold text-3xl'
                htmlFor='username'
              >
                Tên đăng nhập
              </label>
              <input
                placeholder='username'
                id='username'
                className={`border text-2xl placeholder:font-normal font-semibold w-full p-4 px-6 shadow-md rounded-lg ${
                  errors.username ? 'border-danger' : ''
                }`}
                {...register('username', { required: true })}
                type='text'
              />
              {errors.username && (
                <span className='text-danger text-xl font-semibold mt-2 block'>
                  Bạn chưa điền thông tin
                </span>
              )}
            </div>

            <div className='mb-5'>
              <label className='block mb-3 font-bold text-3xl' htmlFor='email'>
                Email
              </label>
              <input
                placeholder='you@example.com'
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
                placeholder='••••••••'
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
            <Button className='w-full my-5' type='submit'>
              Đăng ký
            </Button>
            <div className='text-center text-xl mt-5'>
              <label htmlFor=''>
                Nếu đã có tài khoản ?{' '}
                <Link className='font-bold' to='/sign-in'>
                  Đăng nhập
                </Link>
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default memo(SignUpPage);
