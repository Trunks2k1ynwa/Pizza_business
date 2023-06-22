/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { classNames } from '../../utils/common';

const Avatar = ({ imgUrl, className }) => {
  return (
    <Link
      className={classNames(
        className,
        'rounded-full h-12 lg:h-16 bg-contain bg-center overflow-hidden border-box p-1 aspect-square border-primary border-2',
      )}
      to='/me/account'
    >
      <img className='scale-125' alt='avatar' src={imgUrl} />
    </Link>
  );
};

export default Avatar;
