/* eslint-disable react/prop-types */
import { memo } from 'react';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';

import SliderBtnNext from '@components/molecules/SliderBtnNext';
import SliderBtnPrev from '@components/molecules/SliderBtnPrev';
import CountButton from '@components/molecules/CountButton';
import Button from '../atoms/Button.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import http from '../../services/http.js';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setNumber,
  setProducts,
  setTotalPrice,
} from '../../../redux/slices/cartSlice.jsx';

const ProductInfo = ({ product }) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const productId = useParams().id;
  const { overview, discount, price, images, averageRating } = product;

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i]?.url} />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SliderBtnPrev />,
    nextArrow: <SliderBtnNext />,
  };
  const handleAddCart = () => {
    const getAPI = async () => {
      try {
        const response = await http.patch('carts/me', {
          productId: productId,
          number: count,
        });
        const cartData = response.data.data;
        dispatch(setNumber(cartData.products.length));
        dispatch(setProducts(cartData.products));
        dispatch(setTotalPrice(cartData.totalPrice));
      } catch (err) {
        console.log('🚀 ~ err:', err);
      }
    };
    getAPI();
    toast.success('Thêm sản phẩm vào giỏ hàng thành công', {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        background: '#28A745',
      },
    });
  };
  return (
    <div className='flex justify-center gap-x-[10rem]'>
      <Toaster position='top-right' reverseOrder={false} />
      <div className='w-[35vw] pb-[10rem]'>
        <Slider {...settings}>
          {images &&
            images?.map((img) => (
              <div key={uuidv4()}>
                <img className='border border-primary' src={img.url} />
              </div>
            ))}
        </Slider>
      </div>
      <div className='w-[40vw] py-10 gap-y-5 flex flex-col justify-start'>
        <h2 className='font-bold text-4xl text-primary'>{overview}</h2>
        <p className='text-2xl self-start'>An toàn, lành tính với mọi làn da</p>
        <p className='text-2xl self-start'>Đánh giá: {averageRating} 🌟</p>
        <div className='center-cross gap-x-4 '>
          <h2 className='text-danger text-5xl font-semibold'>
            {(price - price * (discount / 100)).toLocaleString('vi')}đ
          </h2>
          {discount && (
            <>
              <h4 className='text-3xl font-semibold text-grayBold line-through'>
                {price?.toLocaleString('vi')}đ
              </h4>
              <span className='text-xl font-bold rounded-full p-2 px-4 bg-primary text-white '>
                {discount}%
              </span>
            </>
          )}
        </div>
        <div className='flex gap-x-10 py-10'>
          <CountButton count={count} setCount={setCount} />
          <Button onClick={handleAddCart} className='rounded-full bg-primary'>
            Thêm vào giỏ hàng
          </Button>
          <Button className='bg-danger rounded-full'>Mua ngay</Button>
        </div>
        <div className='text-2xl grid gap-x-10 gap-y-5 font-semibold grid-cols-2'>
          <p>✨ Loại vật lý * Hóa học</p>
          <p>✨ Chỉ số SPF 40, PA ++</p>
          <p>🌿An toàn cho da nhạy cảm, mẹ bầu, trẻ nhỏ</p>
          <p>🫧 Kiểm nghiệm lâm sáng bảo vệ da lên đến 8h</p>
          <p>💧 Tính kháng nước hiệu quả trên bề mặt da</p>
          <p>✨ Lớp finish tự nhiên, mỏng nhẹ, nâng tông nhẹ nhàng</p>
          <p>🌿 Bổ sung AmitoseR dưỡng ẩm từ thiên nhiên</p>
        </div>
        <h5 className='text-2xl'>
          <b className='text-primary'>
            <i className='fa-solid fa-circle-check mr-2' />
            Miễn phí
          </b>{' '}
          đổi trả sản phẩm lỗi do vận chuyển, sản xuất
        </h5>
        <div className='flex gap-x-5 text-xl'>
          <div className='p-5 bg-graySemi rounded-xl'>
            <h4 className='pb-2 text-2xl font-semibold'>Phí ship</h4>
            <ul>
              <li>Nội thành Hà Nội - 20.000đ</li>
              <li>Các tỉnh còn lại - 25.000đ</li>
            </ul>
          </div>
          <div className='p-5 bg-graySemi rounded-lg'>
            <h4 className='pb-2 text-2xl font-semibold'>
              Thời gian ship dự kiến
            </h4>
            <ul>
              <li>Hà Nội,TP.HCM : 1-2 ngày</li>
              <li>Các tỉnh còn lại : 2-4 ngày</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInfo);
