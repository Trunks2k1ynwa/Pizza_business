import { memo, useCallback, useEffect } from 'react';
import UpdateIcon from '../../components/atoms/UpdateIcon.jsx';
import DeleteIcon from '../../components/atoms/DeleteIcon.jsx';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../components/atoms/Button.jsx';
import InputSearch from '../../components/molecules/InputSearch.jsx';
import IconEye from '../../components/atoms/IconEye.jsx';
import http from '../../services/http.js';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../../redux/slices/productSlice.jsx';
import Swal from 'sweetalert2';
import { Tag } from '../../components/atoms/Tag.jsx';
const ProductManagementPage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((value) => value.product.products);

  useEffect(() => {
    const getData = async () => {
      const response = await http.get('products');
      const productList = response.data.data;
      dispatch(setProducts(productList));
    };
    getData();
  }, [dispatch, productList.length]);
  const handleDeleteProduct = useCallback(
    async (id) => {
      Swal.fire({
        title: 'Xác nhận yêu cầu xóa',
        text: 'Bạn không thể khôi phục lại dữ liệu',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý xóa',
        cancelButtonText: 'Thoát',
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Xóa hoàn tất!',
            'Dữ liệu sản phẩm đã bị xóa khỏi hệ thống',
            'success',
          );
          await http.delete(`products/${id}`);
          const data = productList.filter((item) => item.id !== id);
          dispatch(setProducts(data));
        }
      });
    },
    [dispatch, productList],
  );
  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-lg py-10 w-full'>
      <div className='p-10 pt-0 center-cross justify-between'>
        <h3 className='font-bold text-primary'>List Product</h3>
        <div className='flex gap-x-10'>
          <Button to='/manage/add-product'>
            <i className='fa-solid fa-plus pr-4' />
            Add new
          </Button>
          <InputSearch className='w-[10rem]' />
          <select
            className='bg-graySemi text-xl font-semibold px-4 py-3 rounded-lg border-primary border'
            name='filter'
            id='filer-product'
          >
            <option value='name'>Tên sản phẩm</option>
            <option value='price'>Giá sản phẩm</option>
            <option value='category'>Thể loại</option>
          </select>
        </div>
      </div>
      <div className='center-both'>
        <table className='text-2xl text-left overflow-hidden block overflow-x-auto border-collapse border-spacing-6  pb-8 whitespace-nowrap'>
          <thead className='bg-graySemi border'>
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Thể loại</th>
              <th>Giá sản phẩm</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr
                className='transition-all hover:bg-semi hover:text-primary cursor-pointer border'
                key={uuidv4()}
              >
                <td>{product._id}</td>
                <td>
                  <img
                    className='w-14 rounded-md border border-primary'
                    src={product.images[0].url}
                    alt=''
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category.name}</td>
                <td>{product.price.toLocaleString('vi')}đ</td>
                <td>
                  <Tag type={product.status}>{product.status}</Tag>
                </td>

                <td>
                  <IconEye to={`/product/${product.id}`} />
                  <UpdateIcon to={`/manage/update-product/${product.id}`} />
                  <DeleteIcon onClick={() => handleDeleteProduct(product.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='text-center mt-10'>
        <Button>Xem thêm</Button>
      </div>
    </div>
  );
};

export default memo(ProductManagementPage);
