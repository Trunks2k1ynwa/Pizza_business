const BadRequest = () => {
  return (
    <div className='bg-white rounded-2xl shadow-lg py-10 w-full text-center'>
      <img className='h-[40vh] mx-auto' src='/public/badreques.png' alt='' />
      <h3 className='text-primary text-4xl font-bold'>
        Bạn không có quyền truy cập vào tài nguyên này
      </h3>
    </div>
  );
};

export default BadRequest;
