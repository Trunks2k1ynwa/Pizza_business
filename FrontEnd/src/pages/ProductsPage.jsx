/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import http from '../services/http.js';
import React, { useEffect, useState } from 'react';
import CardProduct from '../components/molecules/CardProduct.jsx';
import Button from '../components/atoms/Button.jsx';
import Loading from '../components/atoms/Loading.jsx';

const ProductsPage = () => {
  const {
    data,
    error,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['paginate'],
    queryFn: async ({ pageParam = 1 }) =>
      await http.get('products', {
        params: {
          page: pageParam, // Số lượng sản phẩm đã hiển thị trước đó
          limit: 2, // Số lượng sản phẩm mới cần tải thêm
        },
      }),
    getNextPageParam: (lastPage, pages) => {
      const { nextPage } = lastPage.data;
      return nextPage;
    },
    getPreviousPageParam: (firstPage, pages) => {
      const previousPage = pages[pages.length - 1].data.previousPage;
      console.log('🚀 ~ previousPage:', previousPage);
      return previousPage;
    },
  });
  console.log('data', data);
  return status === 'loading' ? (
    <Loading />
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <main>
      <section className='flex flex-wrap'>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.data.map((product) => (
              <CardProduct key={product.id} productInfo={product} />
            ))}
          </React.Fragment>
        ))}
      </section>
      <div className='flex justify-center py-4 gap-x-4'>
        <div className='flex gap-x-4'>
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
          </Button>
          <Button onClick={() => fetchPreviousPage()}>Thu gọn</Button>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
7;
