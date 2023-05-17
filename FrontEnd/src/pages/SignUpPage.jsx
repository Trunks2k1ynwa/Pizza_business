/* eslint-disable react/no-unknown-property */
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import http from '../services/http.js';
import { showAlert } from '../../alerts.js';
import { useDispatch } from 'react-redux';
import { setAccount } from '../../redux/slices/accountSlice.jsx';

const SignUpPage = () => {
  const dispatch = useDispatch();
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
  const onSubmit = async (data) => {
    try {
      const response = await http.post('accounts/signup', data);
      const { token } = response.data;
      const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000 * 60); // Hết hạn sau 60 giờ
      document.cookie = `jwt=${token}; expires=${expirationTime.toUTCString()}; path=/`;

      const account = response.data.data.user;
      const getData = async () => {
        try {
          const response = await http('accounts/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const accountMe = response.data;
          dispatch(setAccount(accountMe.data));
        } catch (err) {
          console.log(err);
        }
      };
      getData();
      dispatch(setAccount({ token, ...account }));
      if (response.data.status === 'success') {
        showAlert('success', 'Đăng ký tài khoản thành công!');
        const { token } = response.data.data;
        const account = response.data.data.user;
        dispatch(setAccount({ token, ...account }));
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
    reset();
  };
  return (
    <section className='center-main text-primary h-[95vh]'>
      <div className=' center-both px-[4rem] flex-[3_3_0%]'>
        <img className='bg-cover' src='/public/Loginuser.png' alt='' />
      </div>
      <div className='flex-[2_2_0%] bg-primaryF4 bg-cover backdrop-blur-xl flex flex-col justify-center'>
        <div className='text-left px-[15%] my-10'>
          <h2 className='font-bold text-4xl'>👋 Chào bạn</h2>
          <p className='text-2xl'>
            Vui lòng điền đầy đủ thông tin bên dưới để đăng nhập tài khoản nha
          </p>
        </div>
        <div className='center-both'>
          <form className='w-[70%]' onSubmit={handleSubmit(onSubmit)} action=''>
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
            <button
              className='bg-primary w-full mt-7 border transition-all border-primary text-white hover:shadow-xl p-4 pt-6 text-center font-bold rounded-md text-3xl cursor-pointer active:bg-primary'
              type='submit'
            >
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default memo(SignUpPage);
