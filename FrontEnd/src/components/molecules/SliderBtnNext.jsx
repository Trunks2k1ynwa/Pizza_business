/* eslint-disable react/prop-types */

const SliderBtnNext = (props) => {
  const { onClick } = props;
  return (
    <div className="cursor-pointer btn-next" onClick={onClick}>
      <i className="text-6xl transition-all fa-solid text-primaryF3 hover:text-primary fa-chevron-right" />
    </div>
  );
};
export default SliderBtnNext;
