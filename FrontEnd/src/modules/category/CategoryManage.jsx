import { memo, useEffect } from 'react';
import IconEye from '../../components/atoms/IconEye.jsx';
import UpdateIcon from '../../components/atoms/UpdateIcon.jsx';
import DeleteIcon from '../../components/atoms/DeleteIcon.jsx';
import Button from '../../components/atoms/Button.jsx';
import InputSearch from '../../components/molecules/InputSearch.jsx';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../services/http.js';
import { setcategoriesDb } from '../../../redux/slices/categoriesSlice.jsx';
import { Tag } from '../../components/atoms/Tag.jsx';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categoriesList = useSelector((value) => value.categories.categoriesDb);
  console.log('🚀 ~ categoriesList:', categoriesList);

  useEffect(() => {
    const getData = async () => {
      const response = await http.get('categories');
      const categoriesList = response.data.data;
      console.log('🚀 ~ categoriesList:', categoriesList);
      dispatch(setcategoriesDb(categoriesList));
    };
    getData();
  }, [dispatch, categoriesList.length]);
  return (
    <div className='bg-white rounded-2xl shadow-lg py-10 w-full'>
      <div className='p-10 pt-0 center-cross justify-between'>
        <h3 className='font-bold text-primary'>List Category</h3>
        <div className='flex gap-x-10'>
          <Button>
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
      <div className='center-both'>
        <table className='text-2xl text-left table-fixed overflow-hidden block overflow-x-auto border-collapse border-spacing-6 hover:border-collapse whitespace-nowrap'>
          <thead className='bg-graySemi border'>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {categoriesList.map((category) => (
              <tr
                className='transition-all hover:bg-semi hover:text-primary cursor-pointer border'
                key={uuidv4()}
              >
                <td>{category?._id}</td>
                <td>{category?.name}</td>
                <td>{category?.description.slice(0, 30)}...</td>
                <td>
                  <Tag>{category?.status}</Tag>
                </td>
                <td>
                  <IconEye />
                  <UpdateIcon />
                  <DeleteIcon />
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
      <div className='text-center mt-10'>
        <Button>Xem thêm</Button>
      </div>
    </div>
  );
};

export default memo(CategoryManagement);
