/* eslint-disable no-unused-vars */
import Field from '../../components/atoms/Field.jsx';
import Label from '../../components/atoms/Label.jsx';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Input from '../../components/atoms/Input.jsx';
import useFirebaseImage from '../../hooks/useFirebaseImage.jsx';
import Button from '../../components/atoms/Button.jsx';
import ImageUpload from '../../components/molecules/ImageUpload.jsx';
import { addImage } from '../../../redux/slices/imageSlice.jsx';
import http from '../../services/http.js';
import { useNavigate } from 'react-router-dom';
import { setAccount, setPhoto } from '../../../redux/slices/accountSlice.jsx';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { setCart } from '../../../redux/slices/cartSlice.jsx';
import Breadcumb from '../../components/organisms/Breadcumb.jsx';

const AccountMe = () => {
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const photo = useSelector((value) => value.account.photo);
  const { handleSubmit, setValue, getValues, reset, control } = useForm({
    defaultValues: {},
  });
  const dispatch = useDispatch();

  const { progress, handleSelectImage, handleDeleteImage } = useFirebaseImage(
    setValue,
    getValues,
  );
  useEffect(() => {
    reset(account && account);
    dispatch(setPhoto(account?.photo));
  }, [account, dispatch, reset, setValue]);
  // useEffect(() => {
  //   dispatch({ type: 'GET_ACCOUNT_REQUEST' });
  // }, [dispatch]);
  const handleLogOut = async () => {
    window.scrollTo(0, 0);
  };

  const handleUpdateAccount = async (values) => {
    const { email, username } = values;
    try {
      const response = await http.patch('accounts/updateInfoMe', {
        email,
        username,
        photo,
      });
      const accountUpdate = response.data.data.user;
      toast.success('Cập nhật thông tin thành công thành công', {
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'white',
          background: '#28A745',
        },
      });
      dispatch(setAccount(accountUpdate));
    } catch (err) {
      console.log(err);
    }
  };

  //Done
  const handleUpdatePassword = async (values) => {
    const { passwordCurrent, newPassword, passwordConfirm } = values;
    if (passwordCurrent === newPassword) {
      toast.error(
        'Vui lòng đặt mật khẩu mới không trùng với mật khẩu ban đầu',
        {
          duration: 1000,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#a72828',
            background: 'white',
          },
        },
      );
    } else if (newPassword !== passwordConfirm) {
      toast.error('Mật khẩu không trùng khớp', {
        duration: 1000,
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#a72828',
          background: 'white',
        },
      });
    } else {
      console.log(passwordCurrent, newPassword, passwordConfirm);
      try {
        const response = await http.patch('accounts/updateMyPassword', {
          passwordCurrent,
          newPassword,
          passwordConfirm,
        });
        const token = response.data.token;
        const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000 * 60); // Hết hạn sau 60 giờ
        document.cookie = `jwt=${token}; expires=${expirationTime.toUTCString()}; path=/`;
        toast.success('Đặt lại mật khẩu thành công, Vui lòng đăng nhập lại', {
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            background: '#28A745',
          },
        });
        navigate('/sign-in');
        reset();
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSaga = () => {
    dispatch({ type: 'GET_ACCOUNT' });
  };
  return (
    <div>
      <Toaster position='top-right' reverseOrder={false} />
      <h2 className='text-5xl my-10 text-primary font-semibold'>
        Cài đặt tài khoản
      </h2>
      <Button onClick={handleSaga}>Click me</Button>
      <div className=' mt-4 '>
        <form
          className='border-b border-primary py-10'
          onSubmit={handleSubmit(handleUpdateAccount)}
        >
          <section className='grid gap-x-10 grid-cols-2'>
            <Field>
              <Label>Tên tài khoản</Label>
              <Input control={control} name='username' placeholder='username' />
            </Field>
            <Field>
              <Label>Email</Label>
              <Input
                type='email'
                control={control}
                name='email'
                placeholder='@example.com'
              />
            </Field>
          </section>
          <div className='flex gap-x-4 my-10'>
            <ImageUpload
              progress={progress}
              control={control}
              folder='avatar'
              type='file'
              name='photo'
              className='border aspect-square border-primary w-[9.5rem] rounded-full'
              onChange={handleSelectImage}
              onDeleteImage={handleDeleteImage}
            />
          </div>
          <Button type='submit' className='mb-14'>
            Lưu cài đặt
          </Button>
        </form>
        <form
          className='border-b border-primary py-10'
          onSubmit={handleSubmit(handleUpdatePassword)}
        >
          <h2 className='text-5xl my-10 text-primary font-semibold'>
            Thay đổi mật khẩu
          </h2>
          <section className='w-[60%]'>
            <Field>
              <Label>Mật khẩu hiện tại</Label>
              <Input
                control={control}
                name='passwordCurrent'
                placeholder='••••••••'
                required
                minLength='5'
              />
            </Field>
            <Field>
              <Label>Mật khẩu mới</Label>
              <Input
                control={control}
                name='newPassword'
                placeholder='••••••••'
                required
                minLength='5'
              />
            </Field>
            <Field>
              <Label>Xác nhận mật khẩu</Label>
              <Input
                control={control}
                name='passwordConfirm'
                placeholder='••••••••'
                required
                minLength='5'
              />
            </Field>
          </section>
          <Button type='submit' className='mb-14'>
            Lưu mật khẩu
          </Button>
        </form>
        <Button onClick={handleLogOut} className='mt-4 mx-auto center-both'>
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default AccountMe;
