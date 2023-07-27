import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { v4 as uuidv4 } from 'uuid';
import { memo } from 'react';
import { Title } from '@components/atoms/Title';
import SliderComponent from '@components/molecules/SliderProduct';
import CardProduct from '@components/molecules/CardProduct';
import Loading from '../atoms/Loading.jsx';

/* eslint-disable react/prop-types */
const ListProduct = ({ title, dataProduct }) => {
  if (!dataProduct) return <div>Loading...</div>;
  const { isLoading, isError, data, isSuccess } = dataProduct;
  if (isError) return null;
  if (isLoading) <Loading />;
  if (isSuccess) {
    const products = data?.data.data;
    return (
      <section className='my-10 list_product'>
        <Title>{title}</Title>
        <SliderComponent className=''>
          {products &&
            products.map((product) => (
              <div key={uuidv4()}>
                <CardProduct productInfo={product} />
              </div>
            ))}
        </SliderComponent>
      </section>
    );
  }
};

export default memo(ListProduct);
