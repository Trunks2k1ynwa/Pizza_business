/* eslint-disable react/prop-types */
import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SliderProduct from '@components/molecules/SliderProduct';

const HomeCarousel = () => {
  const listSlider = [
    { path: '/public/Banner5.PNG' },
    { path: '/public/Banner6.PNG' },
    { path: '/public/Banner7.png' },
    { path: '/public/Banner8.png' },
  ];
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderBtnNext />,
    prevArrow: <SliderBtnNPrev />,
  };
  return (
    <section className='header-carousel'>
      <SliderProduct settings={settings} className=''>
        {listSlider.map((slide) => (
          <div className='' key={uuidv4()}>
            <img
              className='cursor-pointer md:object-top sm:object-center h-[60vh] w-full object-cover brightness-50'
              src={slide.path}
              alt=''
            />
          </div>
        ))}
      </SliderProduct>
    </section>
  );
};

export default memo(HomeCarousel);
const SliderBtnNPrev = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className='swiper-button-prev top-[50%]  left-16'>
      {' '}
      <i className='fa-solid fa-arrow-left' />
    </div>
  );
};
const SliderBtnNext = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className='swiper-button-next top-[50%]  right-16'>
      {' '}
      <i className='fa-solid fa-arrow-right' />
    </div>
  );
};
