/* eslint-disable react/prop-types */
import { memo } from 'react';
import { Link } from 'react-router-dom';

const CardProduct = ({ productInfo = {} }) => {
  const { id, images, title, overview, price, discount } = productInfo;
  return (
    <article
      id='card-product'
      className='text-center hover:bg-semi my-10 group ml-6 shadow-lg border-2 border-primary hover:shadow-shadow1 w-[22rem] rounded-3xl overflow-hidden bg-black'
    >
      <Link to={`/product/${id}`}>
        <div className='overflow-hidden'>
          <img
            className='bg-cover transition-all group-hover:shadow-xl group-hover:scale-90 h-[23rem]'
            src={images[0].url}
            alt=''
          />
        </div>
        <div className='px-3 py-8 bg-alice'>
          <h3 className='text-3xl font-semibold uppercase text-primary'>
            {title}
          </h3>
          <p className='text-2xl text-center text-primary'>
            {overview.length > 40 ? overview.slice(0, 40) : overview}
          </p>
          {discount && discount.value > 0 ? (
            <div className='px-4 mt-3 center-both gap-x-4'>
              <h4 className='text-3xl font-semibold text-danger'>
                {((price * (100 - discount?.value)) / 100).toLocaleString('vi')}
                đ
              </h4>
              <span className='text-secondary ml-[-3px] font-bold center-both px-3 py-1 bg-primary rounded-md'>
                -{discount?.value}%
              </span>
            </div>
          ) : (
            <div className='px-4 mt-3 center-both gap-x-2'>
              <h4 className='text-3xl font-semibold text-danger'>
                {price.toLocaleString('vi')}đ
              </h4>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default memo(CardProduct);
