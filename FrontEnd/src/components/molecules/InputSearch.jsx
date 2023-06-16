// import { useEffect, useRef } from 'react';
// import useShowElement from '../../hooks/useShowElement.jsx';

const InputSearch = () => {
  // const [isVisible, toggleVisibility, setIsVisible] = useShowElement(false);
  // const inputRef = useRef(null);
  // useEffect(() => {
  //   if (isVisible && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [isVisible]);
  // useEffect(() => {
  //   if (screen.width > 1280) {
  //     setIsVisible(true);
  //   }
  // }, []);
  return (
    <div className='flex items-center  lg:border-primary p-3 text-2xl bg-semi rounded-md'>
      <span className='text-primary cursor-pointer px-3'>
        <i className='fa-solid text-2xl  fa-magnifying-glass text-gray-400' />
      </span>
      <input placeholder='Tìm kiếm....' className='bg-semi' type='text' />
    </div>
  );
};
export default InputSearch;
