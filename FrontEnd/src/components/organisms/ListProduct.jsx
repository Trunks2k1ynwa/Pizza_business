import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { v4 as uuidv4 } from 'uuid';
import { memo } from 'react';
import { Title } from '@components/atoms/Title';
import SliderComponent from '@components/molecules/SliderProduct';
import CardProduct from '@components/molecules/CardProduct';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

/* eslint-disable react/prop-types */
const ListProduct = ({ title }) => {
  const products = useSelector((value) => value.home.product);

  if (isEmpty(products)) return null;
  return (
    <section className='my-10'>
      <Title>{title}</Title>
      <SliderComponent className='w-[95%]'>
        {products &&
          products.map((product) => (
            <div key={uuidv4()}>
              <CardProduct productInfo={product} />
            </div>
          ))}
      </SliderComponent>
    </section>
  );
};

export default memo(ListProduct);
