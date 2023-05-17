import { Controller, useForm } from 'react-hook-form';
import Field from '../../components/atoms/Field.jsx';
import Heading from '../../components/atoms/Heading.jsx';
import Input from '../../components/atoms/Input.jsx';
import Label from '../../components/atoms/Label.jsx';
import useFirebaseImage from '../../hooks/useFirebaseImage.jsx';
import http from '../../services/http.js';
import Button from '../../components/atoms/Button.jsx';
import ImageUpload from '../../components/molecules/ImageUpload.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAccountOther,
  setPhotoOther,
} from '../../../redux/slices/accountSlice.jsx';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AccountUpdate = () => {
  const dispatch = useDispatch();
  const account = useSelector((value) => value.account.accountOther);
  const photo = useSelector((value) => value.account.photo);
  const accountId = useParams().id;
  const { handleSubmit, reset, control, setValue, getValues } = useForm({
    defaultValues: {
      photo: {},
    },
  });
  const { progress, handleSelectImage, handleDeleteImage } = useFirebaseImage(
    setValue,
    getValues,
  );
  useEffect(() => {
    const { username, email, photo, role } = account;
    reset(account && { username, email, photo, role });
    dispatch(setPhotoOther(account?.photo));
  }, [account, dispatch, reset, setValue]);

  const handleUpdateAccount = async (values) => {
    console.log('🚀 ~ values:', values, photo);
    try {
      const response = await http.patch('accounts/updateInfoMe', {
        ...values,
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
      dispatch(setAccountOther(accountUpdate));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await http.get(`accounts/${accountId}`);
        const accountMe = response.data.data;
        dispatch(setAccountOther(accountMe));
        dispatch(setPhotoOther(accountMe.photo));
      } catch (err) {
        console.log(err);
      }
    };
    if (document.cookie.indexOf('jwt') >= 0) {
      getData();
    }
  }, [accountId, dispatch]);
  return (
    <div className='bg-white rounded-2xl shadow-lg p-14 w-full'>
      <Toaster position='top-right' reverseOrder={false} />
      <Heading>Update Account</Heading>
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
          <Field>
            <Label>Role</Label>
            <Controller
              name='role'
              control={control}
              rules={{ required: true }}
              defaultValue={account.role}
              render={({ field }) => (
                <select
                  {...field}
                  className='bg-semi w-full px-6 text-2xl py-4 rounded-md'
                  name='role'
                  id=''
                >
                  <option value='admin'>Admin</option>
                  <option value='editor'>Editor</option>
                  <option value='seller'>Seller</option>
                </select>
              )}
            />
          </Field>
          <Field>
            <Label>Role</Label>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              defaultValue={account.role}
              render={({ field }) => (
                <select
                  {...field}
                  className='bg-semi w-full px-6 text-2xl py-4 rounded-md'
                  name='role'
                  id=''
                >
                  <option value='active'>Active</option>
                  <option value='pending'>Pending</option>
                  <option value='reject'>Reject</option>
                </select>
              )}
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
          Update
        </Button>
      </form>
    </div>
  );
};
export default AccountUpdate;
