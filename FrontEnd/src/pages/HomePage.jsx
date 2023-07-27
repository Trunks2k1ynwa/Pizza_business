import HomeBanner from '../modules/home/HomeBanner';
import ListProduct from '../components/organisms/ListProduct';
import HomeCarousel from '../modules/home/HomeCarousel.jsx';
import { useQueries } from '@tanstack/react-query';
import http from '../services/http.js';

const HomePage = () => {
  const listBanner = [
    { path: '/public/Banner1.png' },
    { path: '/public/Banner2.png' },
    { path: '/public/Banner3.png' },
  ];
  const listAdvertisement = [
    { path: 'https://comem.vn/images/banners/banner-second-1-desktop.jpg' },
    { path: 'https://comem.vn/images/banners/banner-second-2-desktop.jpg' },
  ];
  const productsBestSeller = {
    queryKey: ['product_bestSeller'],
    queryFn: async () => {
      return await http.get(
        'products?fields=title,price,images,discount,overview&sort=-price',
      );
    },
  };
  const productsNewest = {
    queryKey: ['product_newest'],
    queryFn: async () => {
      return await http.get(
        'products?fields=images,title,overview,price,discount&sort=averageRating',
      );
    },
  };
  const productsFeatured = {
    queryKey: ['product_featured'],
    queryFn: async () => {
      return await http.get(
        'products?fields=images,title,overview,price,discount?&sort=title',
      );
    },
  };
  const userQueries = useQueries({
    queries: [productsBestSeller, productsNewest, productsFeatured],
  });
  return (
    <>
      <HomeCarousel />
      <main className='px-8 sm:px-14  lg:px-[3rem] '>
        <ListProduct
          dataProduct={userQueries[0]}
          title='💥 TOP SẢN PHẨM BÁN CHẠY'
        />
        <HomeBanner className='' listBanner={listAdvertisement} />
        <ListProduct
          dataProduct={userQueries[1]}
          title='❤️‍🔥 SẢN PHẨM MỚI RA MẮT'
        />
        <HomeBanner className='h-[20rem]' listBanner={listBanner} />
        <ListProduct dataProduct={userQueries[2]} title='✨ SẢN PHẨM NỔI BẬT' />
      </main>
    </>
  );
};

export default HomePage;
