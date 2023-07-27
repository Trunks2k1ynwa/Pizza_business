/* eslint-disable no-unused-vars */
import React, { useEffect, useId, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputCheckBox from '../components/atoms/InputCheckBox.jsx';
import { FormProvider, useForm } from 'react-hook-form';
import _, { isString } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import http from '../services/http.js';
import CardProduct from '../components/molecules/CardProduct';
import Loading from '../components/atoms/Loading.jsx';
const ProductsPage = () => {
  const methods = useForm();
  const [productList, setProductList] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [filterPrice, setFilterPrice] = useState('');
  const priceProduct = [
    {
      title: 'Dưới 500.000đ',
      price: [0, 500000],
    },
    {
      title: '500.000đ - 1.000.000đ',
      price: [500000, 1000000],
    },
    {
      title: '1.000.000đ - 1.500.000đ',
      price: [1000000, 1500000],
    },

    {
      title: '1.500.000đ - 2.00.000đ',
      price: [1500000, 2000000],
    },

    {
      title: 'Trên 2.00.000đ',
      price: [2000000],
    },
  ];
  const categoryProduct = [
    {
      category: 'Trang điểm',
      number: 12,
    },
    {
      category: 'Dưỡng da',
      number: 3,
    },
    {
      category: 'Chăm sóc tai',
      number: 2,
    },
    {
      category: 'Chăm sóc cơ thể',
      number: 8,
    },
    {
      category: 'Hương thơm',
      number: 4,
    },
    {
      category: 'Em bé',
      number: 9,
    },
  ];
  const checkedValues = methods.watch('price', []);

  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ['product_filter'],
    queryFn: async () => {
      return await http.get('products');
    },
  });
  const handleChangeSelect = (e) => {
    setSortField(e.target.value);
  };
  let listProductFilter = data?.data?.data;
  useEffect(() => {
    const sortProduct = (type) => {
      const types = {
        id: 'id',
        newest: 'createdAt',
        'price.desc': 'price',
        'price.asc': 'price',
        title: 'title',
      };
      let sortOrder = 1;
      const sortProperty = types[type];
      if (sortProperty === 'price') {
        sortOrder = type === 'price.asc' ? 1 : -1;
      }
      const sorted = listProductFilter?.sort((a, b) => {
        if (isString(a[sortProperty])) {
          return a[sortProperty].localeCompare(b[sortProperty]);
        } else {
          return sortOrder * (a[sortProperty] - b[sortProperty]);
        }
      });
      setProductList(sorted);
    };
    sortProduct(sortField);
    return () => {
      setSortField('id');
    };
  }, [listProductFilter, sortField]);
  return (
    <main className='flex px-8 my-10 sm:px-14  lg:px-[3rem]'>
      <section className='flex-1'>
        <div id='product_collection'>
          <span className='text-3xl'>Danh mục sản phẩm</span>
        </div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon fontSize='large' />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            style={{ height: 'fit-content' }}
          >
            <h4 className='text-3xl'>Giá sản phẩm</h4>
          </AccordionSummary>
          <AccordionDetails>
            <FormProvider {...methods}>
              <ul className='flex flex-col gap-y-4'>
                {priceProduct.map((item, i) => (
                  <li key={i} className='flex gap-x-4'>
                    <InputCheckBox
                      id={item.title}
                      type='checkbox'
                      checked={_.includes(checkedValues, item.price.toString())}
                      value={item.price}
                    />
                    <label
                      className='text-2xl whitespace-nowrap'
                      htmlFor={item.title}
                    >
                      {item.title}
                    </label>
                  </li>
                ))}
              </ul>
            </FormProvider>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon fontSize='large' />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <h4 className='text-3xl'>Loại sản phẩm</h4>
          </AccordionSummary>
          <AccordionDetails>
            <ul className='text-2xl'>
              {categoryProduct.map((category, i) => (
                <li className='flex gap-x-2' key={i}>
                  <a className='' href=''>
                    {category.category}
                  </a>
                  <a className='text-primary font-semibold' href=''>
                    {category.number}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      </section>
      <section className='flex-[4]'>
        <div className='flex justify-between'>
          <h1 className='text-4xl'>Sáp thơm</h1>
          <div className='collections-orderby text-xl'>
            <span>Sắp xếp theo: </span>
            <select
              onChange={handleChangeSelect}
              className='bg-green-200 text-xl pl-5 rounded-lg font-bold'
              name='order-by'
              id='collection-order-by'
            >
              <option className='' value='display_order'>
                {' '}
                -- Sắp xếp --
              </option>
              <option value='newest'>Mới nhất</option>
              <option value='price.desc'>Giá từ cao đến thấp</option>
              <option value='price.asc'>Giá từ thấp đến cao</option>
              <option value='title'>Tên sản phẩm</option>
            </select>
          </div>
        </div>
        <div className='flex flex-wrap mt-5 gap-10'>
          {isLoading ? (
            <Loading />
          ) : (
            productList &&
            productList.map((product) => (
              <CardProduct productInfo={product} key={product.id} />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
7;
