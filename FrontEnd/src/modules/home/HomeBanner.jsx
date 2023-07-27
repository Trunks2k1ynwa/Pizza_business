/* eslint-disable react/prop-types */
import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const HomeBanner = ({ listBanner, className }) => {
  return (
    <section
      className={`overflow-hidden justify-between px-14 flex md:flex-row gap-x-10 ${className}`}
    >
      {listBanner.map((banner) => (
        <div
          key={uuidv4()}
          className='cursor-pointer border overflow-hidden hover:shadow-sm hover:bg-primaryF4 rounded-md transition-all hover:brightness-75 odd:hidden md:odd:block'
        >
          <img className='object-cover h-full' src={banner.path} alt='' />
        </div>
      ))}
    </section>
  );
};

export default memo(HomeBanner);
