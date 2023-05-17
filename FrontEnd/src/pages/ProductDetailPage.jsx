import { useParams } from 'react-router-dom';
import ListProduct from '../components/organisms/ListProduct.jsx';
import Breadcumb from '../components/organisms/Breadcumb.jsx';
// import ProductContent from "../components/template/ProductContent.jsx";
import ProductInfo from '../components/template/ProductInfo.jsx';
import { memo, useEffect } from 'react';
import http from '../services/http.js';
import ProductContent from '../components/template/ProductContent.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../redux/slices/productSlice.jsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((value) => value.product.product);
  useEffect(() => {
    const getData = async () => {
      const response = await http.get(`products/${id}`);
      const productData = response.data.data;
      dispatch(setProduct(productData));
    };
    getData();
  }, [dispatch, id]);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = product.slug;
  }, [product.name, product.slug]);
  if (!product) return null;
  return (
    <section id='product-detail'>
      <main>
        <div className='py-10'>
          <Breadcumb paths={['Product', product.slug]} />
        </div>
        <ProductInfo product={product} />
        <ProductContent content={product.description} />
        <ListProduct title='🌟 Các sản phẩm liên quan' />
      </main>
    </section>
  );
};

export default memo(ProductDetailPage);
