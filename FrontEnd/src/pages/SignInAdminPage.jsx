/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { showAlert } from '../../alerts.js';
import { setAccount } from '../../redux/slices/accountSlice.jsx';
import Button from '../components/atoms/Button.jsx';
import Field from '../components/atoms/Field.jsx';
import Input from '../components/atoms/Input.jsx';
import Label from '../components/atoms/Label.jsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import http from '../services/http.js';
import PageNotFound from './PageNotFound.jsx';

const SignInAdminPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignAdmin = async (values) => {
    try {
      const response = await http.post('accounts/login', values);
      const { user } = response.data.data;
      console.log('🚀 ~ user:', user);
      const { token } = response.data;
      if (user.role == 'user') {
        navigate('/page404');
      } else {
        const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000 * 60); // Hết hạn sau 60 giờ
        document.cookie = `jwt=${token}; expires=${expirationTime.toUTCString()}; path=/`;

        if (response.data.status === 'success') {
          showAlert('success', 'Đăng nhập tài khoản thành công!');
          dispatch(setAccount(user));
          window.setTimeout(() => {
            navigate('/manage/product');
          }, 1000);
        }
      }
    } catch (error) {
      showAlert('error', 'Email hoặc mật khẩu chưa chính xác! ');
      console.log(error);
    }
    reset();
  };
  return (
    <div className='bg-primary h-screen w-screen'>
      <div className="bg-[url('/public/background.png')]  overflow-x-hidden h-full w-full center-both bg-center bg-cover ">
        <div className='bg-white overflow-hidden relative p-10 w-[40rem] px-14 rounded-md'>
          <form
            onSubmit={handleSubmit(handleSignAdmin)}
            action='
      '
          >
            <h3 className='text-center font-bold text-primary text-4xl'>
              NATURE BEAUTY
            </h3>
            <div className='rounded-[38%_62%_54%_46%_/_30%_32%_68%_70%] absolute top-[-2rem] left-[-2rem] w-[10rem] h-[10rem] bg-primary shadow-lg' />
            <div className='rounded-[32%_68%_54%_46%_/_54%_56%_44%_46%] absolute bottom-[-4rem] right-[-2rem] w-[10rem] h-[10rem] bg-primary shadow-lg' />
            <img
              className='w-[10rem] shadow-md my-4 mx-auto'
              src='/public/LogoMain1.png'
              alt=''
            />
            <Field>
              <Label>Email*</Label>
              <Input
                name='email'
                type='email'
                placeholder='example@gmail.com'
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label>Password</Label>
              <Input
                name='password'
                placeholder='••••••••'
                required
                type='password'
                minLength='5'
                control={control}
              ></Input>
            </Field>
            <div>
              <Button className='center-both mx-auto' type='submit'>
                Đăng nhập
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInAdminPage;
