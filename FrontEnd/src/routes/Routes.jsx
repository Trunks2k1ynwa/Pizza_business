import { useLocation, useRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProductDetail from '../pages/ProductDetailPage';
import PageNotFound from '../pages/PageNotFound';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import SearchPage from '../pages/SearchPage';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProducUpdate from '../modules/product/ProducUpdate';
import CartDetailPage from '../pages/CartDetailPage';
import ProductNew from '../modules/product/ProductNew';
import AccountNew from '../modules/account/AccountNew';
import AccountUpdate from '../modules/account/AccountUpdate';
import CategoryNew from '../modules/category/CategoryNew';
import CategoryUpdate from '../modules/category/CategoryUpdate';
import CouponNew from '../modules/coupon/CouponNew';
import CouponUpdate from '../modules/coupon/CouponUpdate';
import ProductManage from '../modules/product/ProductManage';
import AccountManage from '../modules/account/AccountManage';
import OrderManage from '../modules/order/OrderManage';
import CategoryManage from '../modules/category/CategoryManage';
import CouponManage from '../modules/coupon/CouponManage';
import Dashboard from '../modules/dashboard/Dashboard';
import PaymentPage from '../pages/PaymentPage';
import CheckOutOrder from '../pages/CheckOutOrder';
import AccountMe from '../modules/me/AccountMe';
import OrderMe from '../modules/me/OrderMe';
import AddressMe from '../modules/me/AddressMe';
import AccountLayOut from '../layouts/AccountLayOut';
import SignInAdminPage from '../pages/SignInAdminPage.jsx';
import LearnHook from '../components/template/LearnHook.jsx';
import ProductsPage from '../pages/ProductsPage.jsx';

const Routes = () => {
  const ElementRoutes = useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: 'about',
      element: <AboutPage />,
    },
    {
      path: 'products',
      element: <ProductsPage />,
    },
    {
      path: 'hook',
      element: <LearnHook />,
    },
    {
      path: 'product/:id',
      element: <ProductDetail />,
    },
    {
      path: 'page404',
      element: <PageNotFound />,
    },
    {
      path: 'sign-in',
      element: <SignInPage />,
    },
    {
      path: 'sign-up',
      element: <SignUpPage />,
    },
    {
      path: 'search',
      element: <SearchPage />,
    },
    {
      path: 'cart-preview',
      element: <CartDetailPage />,
    },
    {
      path: 'gateway/payment/:id',
      element: <PaymentPage />,
    },
    {
      path: 'order-checkout/:id',
      element: <CheckOutOrder />,
    },
    {
      path: 'sign-in/admin',
      element: <SignInAdminPage />,
    },
    {
      path: 'me',
      element: <AccountLayOut />,
      children: [
        {
          path: 'account',
          element: <AccountMe />,
        },
        {
          path: 'order',
          element: <OrderMe />,
        },
        {
          path: 'address',
          element: <AddressMe />,
        },
      ],
    },
    {
      path: 'manage',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'product',
          element: <ProductManage />,
        },
        {
          path: 'update-product/:id',
          element: <ProducUpdate />,
        },
        {
          path: 'add-product',
          element: <ProductNew />,
        },
        {
          path: 'account',
          element: <AccountManage />,
        },
        {
          path: 'add-account',
          element: <AccountNew />,
        },
        {
          path: 'update-account/:id',
          element: <AccountUpdate />,
        },
        {
          path: 'order',
          element: <OrderManage />,
        },
        {
          path: 'category',
          element: <CategoryManage />,
        },
        {
          path: 'add-category',
          element: <CategoryNew />,
        },
        {
          path: 'update-category',
          element: <CategoryUpdate />,
        },
        {
          path: 'coupon',
          element: <CouponManage />,
        },
        {
          path: 'add-coupon',
          element: <CouponNew />,
        },
        {
          path: 'update-coupon',
          element: <CouponUpdate />,
        },
      ],
    },
  ]);
  const { pathname } = useLocation();
  if (pathname.includes('manage') || pathname.includes('admin'))
    return <>{ElementRoutes}</>;
  return ElementRoutes ? <MainLayout>{ElementRoutes}</MainLayout> : null;
};

export default Routes;
