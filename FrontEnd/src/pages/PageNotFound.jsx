import Button from '../components/atoms/Button.jsx';

const PageNotFound = () => {
  return (
    <section className='page_404 center-both'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 '>
            <div className='col-sm-10 col-sm-offset-1  text-center'>
              <div className='four_zero_four_bg'>
                <h1 className='text-center '>404</h1>
              </div>

              <div className='contant_box_404'>
                <h3 className='h2 font-bold text-5xl text-danger'>
                  PAGE NOT FOUND
                </h3>

                <p className='text-2xl my-3'>
                  Yêu cầu của bạn hiện tại chưa được xử lý!
                </p>
                <Button kind='success' className='mt-10' to='/'>
                  Về trang chủ
                </Button>
              </div>
            </div>
          </div>   
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
