import { Controller, useForm } from 'react-hook-form';
import Field from '../../components/atoms/Field.jsx';
import Heading from '../../components/atoms/Heading.jsx';
import Input from '../../components/atoms/Input.jsx';
import Label from '../../components/atoms/Label.jsx';
import useFirebaseImage from '../../hooks/useFirebaseImage.jsx';
import http from '../../services/http.js';
import { showAlert } from '../../../alerts.js';
import Button from '../../components/atoms/Button.jsx';
import ImageUpload from '../../components/molecules/ImageUpload.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPhoto } from '../../../redux/slices/accountSlice.jsx';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

const AccountNew = () => {
  const dispatch = useDispatch();
  const photo = useSelector((value) => value.account.photo);

  const { handleSubmit, reset, control, setValue, getValues } = useForm({
    defaultValues: {},
  });
  const { progress, handleSelectImage, handleDeleteImage } = useFirebaseImage(
    setValue,
    getValues,
  );

  const handleSubmitForm = async (values) => {
    const cloneValues = { ...values };

    cloneValues.photo = photo;
    console.log(cloneValues);
    const response = await http.post('accounts', cloneValues);
    if (response.data.status === 'success') {
      showAlert('success', 'Create product successfully!');
      toast.success('Tạo tài khoản thành công thành công', {
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'white',
          background: '#28A745',
        },
      });
      reset();
      dispatch(setPhoto({}));
    }
  };
  return (
    <div className='bg-white rounded-2xl shadow-lg p-14 w-full'>
      <Toaster position='top-right' reverseOrder={false} />
      <Heading>Add New Account</Heading>
      <form
        className='border-b border-primary py-10'
        onSubmit={handleSubmit(handleSubmitForm)}
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
            <Label>Mật khẩu</Label>
            <Input
              control={control}
              name='password'
              placeholder='••••••••'
              required
              minLength='5'
            />
          </Field>

          <Field>
            <Label>Role</Label>
            <Controller
              name='category'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  className='bg-semi w-full px-6 text-2xl py-4 rounded-md'
                  name='category'
                  id=''
                >
                  <option value='admin'>Admin</option>
                  <option value='editor'>Editor</option>
                  <option value='seller'>Seller</option>
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
          Add new
        </Button>
      </form>
    </div>
  );
};

export default AccountNew;
