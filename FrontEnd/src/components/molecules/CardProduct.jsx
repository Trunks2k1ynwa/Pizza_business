/* eslint-disable react/prop-types */
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../../utils/common.js';

const CardProduct = ({ productInfo = {} }) => {
  const { id, images, title, overview, price, discount } = productInfo;
  return (
    <article
      id='card-product'
      className={classNames('p-6 rounded-md shadow-md max-w-[22rem] bg-alice')}
    >
      <Link className='flex flex-col gap-y-5 ' to={`/product/${id}`}>
        <img className='aspect-square' src={images[0]?.url} alt='' />
        <div className='flex flex-col gap-y-5 '>
          <h4 className='font-semibold text-primary'>{title}</h4>
          <p className=' text-primary whitespace-pre-wrap leading-8'>
            {overview.length > 40 ? overview.slice(0, 40) + '...' : overview}
          </p>
          {discount && discount.value > 0 ? (
            <div className='center-both gap-x-4'>
              <h4 className='font-semibold text-danger'>
                {price.toLocaleString('vi')}đ
              </h4>
            </div>
          ) : (
            <div className='center-both gap-x-2'>
              <h4 className='font-semibold text-danger'>
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
