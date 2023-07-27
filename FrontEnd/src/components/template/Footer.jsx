import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Footer = () => {
  const listContent = [
    {
      title: 'về nature & beauty',
      content: [
        'Chuyện Của Chúng Tôi',
        'Về Nhà Máy',
        ' Email: Cskh.So@Nature Beauty.Vn',
        'Sđt: +84 0947225188',
      ],
    },
    // {
    //   title: 'HOẠT ĐỘNG CỘNG ĐỒNG',
    //   content: [
    //     'Đôi Bàn Tay Thơm',
    //     'Chung Tay Phòng',
    //     ' Email: Cskh.So@Nature Beauty.Vn',
    //     'Chống COVID',
    //   ],
    // },
    {
      title: 'HƯỚNG DẪN MUA HÀNG',
      content: [
        'Chính Sách Mua Hàng Và Thanh Toán',
        'Chính Sách Bảo Hành',
        ' Chính Sách Đổi Trả Vè Hoàn Tiền',
        'Chính Sách Bảo Mật Thông Tin',
      ],
    },
  ];
  return (
    <footer className='py-10 text-white bg-gradient-to-r from-green-800 to-primary bg-primary center-both'>
      <section className='max-w-[90%] text-xl'>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <section className='flex flex-col gap-y-5 justify-between mb-5 items-start sm:flex-row sm:justify-between sm:gap-x-5'>
            <img className='h-[70px]' src='/public/LogoMain.png' alt='' />
            <div>
              <h3 className='mb-2 text-2xl font-bold'>THEO DÕI CHÚNG TÔI</h3>
              <div className='flex text-black gap-x-5'>
                <span className='w-10 h-10 p-2 bg-white rounded-full center-both'>
                  <i className='text-2xl cursor-pointer fa-brands fa-facebook' />
                </span>
                <span className='w-10 h-10 p-2 bg-white rounded-full center-both'>
                  <i className='text-2xl cursor-pointer fa-brands fa-instagram' />
                </span>
                <span className='w-10 h-10 p-2 bg-white rounded-full center-both'>
                  <i className='text-2xl cursor-pointer fa-brands fa-tiktok' />
                </span>
              </div>
            </div>
          </section>
          {listContent.map((itemContent) => (
            <section key={uuidv4()} className=''>
              <h3 className='mb-2 text-2xl font-bold uppercase'>
                {itemContent.title}
              </h3>
              {itemContent.content.map((item) => (
                <li className='text-2xl md:block ' key={uuidv4()}>
                  {item}
                </li>
              ))}
            </section>
          ))}
        </div>
        <div className='h-1 my-10 line bg-secondary' />
        <section className='flex justify-between gap-10 flex-wrap'>
          <div className='text-2xl'>
            <li>Công ty Cổ phần Mỹ phẩm Thiên nhiên Nature & Beauty</li>
            <li>GPĐKKD số 0109153702 do Sở KHĐT Tp.Hà Nội cấp 09/04/2020</li>
            <li>Sản xuất tại Nhà máy Mỹ phẩm Thiên Nhiên Song An</li>
            <li>225 Trần Đăng Ninh, p. Dịch Vọng, q. Cầu Giấy, Hà Nội</li>
          </div>
          <div className='bg-semi text-2xl font-bold text-black p-3 rounded-md px-5 max-w-[30rem]'>
            *Lưu ý: Tác dụng của sản phẩm có thể thay đổi tùy theo tình trạng
            thể chất mỗi người
          </div>
          <div>
            <img className='w-[8em] mb-2' src='/public/protected.png' alt='' />
            <img className='w-[6em]' src='/public/verified-dmca.png' alt='' />
          </div>
        </section>
        <div className='text-2xl text-semi text-center mt-7'>
          Design & copyright belong with Lê Văn Trunks
        </div>
      </section>
    </footer>
  );
};

export default memo(Footer);
