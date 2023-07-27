/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { memo } from 'react';
import SliderBtnNext from './SliderBtnNext';
import SliderBtnPrev from './SliderBtnPrev';
import { classNames } from '../../utils/common.js';

const SliderProduct = ({
  settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 5,
    dots: false,
    slidesToScroll: 5,
    nextArrow: <SliderBtnNext />,
    prevArrow: <SliderBtnPrev />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
  children,
  className,
}) => {
  return (
    <div className={classNames('slide-component', className)}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
export default memo(SliderProduct);
