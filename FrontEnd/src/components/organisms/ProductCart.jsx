/* eslint-disable react/prop-types */
import { memo, useState } from 'react';
import CountButton from '../molecules/CountButton.jsx';
import Swal from 'sweetalert2';
import {
  setNumber,
  setProducts,
  setTotalPrice,
} from '../../../redux/slices/cartSlice.jsx';
import { useDispatch } from 'react-redux';
import http from '../../services/http.js';

const ProductCart = ({ product, props }) => {
  const { price, overview, images, id } = product.product;
  const [countProduct, setCountProduct] = useState(product?.number);
  const dispatch = useDispatch();
  const handleRemoveProduct = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        const getData = async () => {
          try {
            const response = await http.delete(`carts/me/${id}`);
            const cartData = response.data.data;
            dispatch(setNumber(cartData.products.length));
            dispatch(setProducts(cartData.products));
            dispatch(setTotalPrice(cartData.totalPrice));
          } catch (err) {
            console.log(err);
          }
        };
        getData();
      }
    });
  };
  return (
    <article {...props} className='flex gap-x-10 py-5 border-b'>
      <img
        className='rounded-lg block h-[4rem]'
        src={images && images[0].url}
        alt='Cosmetic'
      />
      <div className='flex flex-col justify-between flex-1'>
        <div className='flex justify-between gap-x-3'>
          <h5 className=' font-bold text-primary mb-2'>{overview}</h5>
          <div
            onClick={handleRemoveProduct}
            className='w-16 h-16 aspect-square cursor-pointer transition-all duration-300 center-both bg-semi rounded-full text-primary '
          >
            <i className='fa-solid text-2xl fa-trash' />
          </div>
        </div>
        <div className='flex justify-between'>
          <CountButton
            id={id}
            count={countProduct}
            setCount={setCountProduct}
            type='small'
          />
          <h4 className=' text-right font-bold text-secondary'>
            {price?.toLocaleString('vi')}Đ
          </h4>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductCart);
