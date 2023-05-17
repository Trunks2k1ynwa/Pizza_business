/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { memo } from "react";
import SliderBtnNext from "./SliderBtnNext";
import SliderBtnPrev from "./SliderBtnPrev";

const SliderProduct = ({
  settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 5,
    dots: false,
    slidesToScroll: 5,
    nextArrow: <SliderBtnNext />,
    prevArrow: <SliderBtnPrev />,
  },
  children,
  className,
}) => {
  return (
    <div className={`slide-component ${className}`}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
export default memo(SliderProduct);
