import { memo } from 'react';
import IconEye from '../../components/atoms/IconEye.jsx';
import UpdateIcon from '../../components/atoms/UpdateIcon.jsx';
import DeleteIcon from '../../components/atoms/DeleteIcon.jsx';
import Button from '../../components/atoms/Button.jsx';
import InputSearch from '../../components/molecules/InputSearch.jsx';
import { v4 as uuidv4 } from 'uuid';

const CouponManagement = () => {
  const dataProducts = [
    {
      id: 'NFwPWTsggggQ2cW60aNubG',
      name: 'Mã giảm giá 30/4',
      code: 'mx304',
      effect: 20,
      status: 'active',
    },
    {
      id: 'NFwPWTs393nn4ndf',
      name: 'Mã giảm giá mùa xuân',
      code: 'mx303',
      effect: 10,
      status: 'Pending',
    },
    {
      id: 'NFwPWTadkfkfadsgnk',
      name: 'Mã giảm giá mùa hè',
      code: 'mh304',
      effect: 20,
      status: 'Pending',
    },
    {
      id: 'NFwPWTadkfkfQ2cWdsạk',
      name: 'Mã giảm giá mùa đông',
      code: 'md48',
      effect: 20,
      status: 'Active',
    },
  ];
  return (
    <div className='bg-white rounded-2xl shadow-lg py-10 w-full'>
      <div className='p-10 pt-0 center-cross justify-between'>
        <h3 className='font-bold text-primary'>List Discount</h3>
        <div className='flex gap-x-10'>
          <Button to='/manage/add-coupon'>
            <i className='fa-solid fa-plus pr-4' />
            Add new
          </Button>
          <InputSearch className='w-[10rem]' />
          <select
            className='bg-graySemi text-xl font-semibold px-4 py-3 rounded-lg border-primary border'
            name='filter'
            id='filer-product'
          >
            <option value='name'>Name</option>
            <option value='price'>Price</option>
            <option value='category'>Category</option>
          </select>
        </div>
      </div>
      <table className='text-2xl w-full text-left border-collapse border-spacing-6 hover:border-collapse'>
        <thead className='bg-graySemi border'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Effect</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataProducts.map((product) => (
            <tr
              className='transition-all hover:bg-semi hover:text-primary cursor-pointer border'
              key={uuidv4()}
            >
              {Object.entries(product).map((item) => (
                <td className='py-5' key={uuidv4()}>
                  {item[1]}
                </td>
              ))}
              <td>
                <IconEye />
                <UpdateIcon to='/manage/update-coupon' />
                <DeleteIcon />
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
      <div className='text-center mt-10'>
        <Button>Xem thêm</Button>
      </div>
    </div>
  );
};
export default memo(CouponManagement);
