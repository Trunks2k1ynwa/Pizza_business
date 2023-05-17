import Field from '../../components/atoms/Field.jsx';
import Label from '../../components/atoms/Label.jsx';
import { useForm } from 'react-hook-form';
import Button from '../../components/atoms/Button.jsx';
import Input from '../../components/atoms/Input.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AddressMe = () => {
  const account = useSelector((value) => value.account.account);
  const { handleSubmit, setValue, reset, control } = useForm({
    defaultValues: {},
  });
  const handleUpdateAccount = async () => {};
  useEffect(() => {
    reset(account && account);
  }, [account, reset, setValue]);
  return (
    <div>
      <h2 className='text-5xl my-10 text-primary font-semibold'>
        Thông tin địa chỉ
      </h2>
      <form
        className='border-b border-primary py-10'
        onSubmit={handleSubmit(handleUpdateAccount)}
      >
        <section className='grid gap-x-10 grid-cols-2'>
          <Field>
            <Label>Địa chỉ của bạn</Label>
            <Input control={control} name='address' placeholder='address' />
          </Field>
          <Field>
            <Label>Địa chỉ chi tiết</Label>
            <Input
              control={control}
              name='addressDetail'
              placeholder='Vd: Số nhà 20,Ngõ 12, Đường Hồ tùng mậu'
            />
          </Field>
        </section>
        <Button className='mb-14'>Lưu thông tin</Button>
      </form>
    </div>
  );
};

export default AddressMe;
