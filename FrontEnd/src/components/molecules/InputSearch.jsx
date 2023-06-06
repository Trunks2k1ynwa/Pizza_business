const InputSearch = () => {
  return (
    <div className='sm:border-[1px] w-fit border-primary pr-5 center-cross'>
      <i className='fa-solid text-primary left-0 cursor-pointer fa-magnifying-glass text-2xl px-4 ' />
      <input
        type='text'
        className='transition-all hidden sm:block bg-transparent text-primary  focus:text-primary  duration-200 box-border py-3 w-[15rem] text-xl pl-1 placeholder:text-gray-400 placeholder:text-xl '
        placeholder='Search..'
      />
    </div>
  );
};
export default InputSearch;
