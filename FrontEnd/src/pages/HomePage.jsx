import HomeCarousel from '../modules/home/HomeCarousel';
import HomeBanner from '../modules/home/HomeBanner';
import { useEffect } from 'react';
import http from '../services/http.js';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../redux/slices/homeSlice';
import ListProduct from '../components/organisms/ListProduct';

const HomePage = () => {
  const dispatch = useDispatch();
  const listBanner = [
    { path: '/public/Banner1.png' },
    { path: '/public/Banner2.png' },
    { path: '/public/Banner3.png' },
  ];
  const listAdvertisement = [
    { path: '/public/Ad1.png' },
    { path: '/public/Ad2.png' },
    { path: '/public/Ad3.png' },
    { path: '/public/Ad4.png' },
    { path: '/public/Ad5.png' },
  ];
  useEffect(() => {
    const getData = async () => {
      const response = await http.get('products');
      const listProduct = response.data.data;
      dispatch(setProduct(listProduct));
    };
    getData();
  }, [dispatch]);

  return (
    <>
      <HomeCarousel />
      <main>
        <ListProduct title='💥 TOP SẢN PHẨM BÁN CHẠY' />
        <HomeBanner className='' listBanner={listAdvertisement} />
        <ListProduct title='❤️‍🔥 SẢN PHẨM MỚI RA MẮT' />
        <HomeBanner className='h-[20rem]' listBanner={listBanner} />
        <ListProduct title='✨ SẢN PHẨM NỔI BẬT' />
      </main>
    </>
  );
};

export default HomePage;
