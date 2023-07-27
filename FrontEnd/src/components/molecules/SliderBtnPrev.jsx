/* eslint-disable react/prop-types */

const SliderBtnPrev = (props) => {
  const { onClick } = props;
  return (
    <div className='cursor-pointer text-primary' onClick={onClick}>
      <i className='text-5xl md:text-6xl transition-all fa-solid text-primaryF3 hover:text-primary fa-chevron-left' />
    </div>
  );
};
export default SliderBtnPrev;
