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
              className='cursor-pointer md:object-top sm:object-center h-[40vh] md:h-[65vh] w-full object-cover'
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
    <div
      onClick={onClick}
      className='swiper-button-prev top-[40%] md:top-[50%] left-10  md:left-16'
    >
      {' '}
      <i className='fa-solid fa-arrow-left' />
    </div>
  );
};
const SliderBtnNext = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className='swiper-button-next top-[40%] md:top-[50%] right-10  md:right-16'
    >
      {' '}
      <i className='fa-solid fa-arrow-right' />
    </div>
  );
};
