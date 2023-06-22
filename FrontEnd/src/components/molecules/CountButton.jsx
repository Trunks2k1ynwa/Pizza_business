/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import http from '../../services/http.js';
import { useDispatch } from 'react-redux';
import {
  setNumber,
  setProducts,
  setTotalPrice,
} from '../../../redux/slices/cartSlice.jsx';
import { classNames } from '../../utils/common';

const CountStyles = styled.div`
  ${(props) =>
    props.type === 'big' &&
    css`
      font-size: 2rem;
      button {
        padding: 1rem;
      }
      span {
        font-weight: bold;
        width: 3rem;
        font-size: 2rem;
      }
    `};
  ${(props) =>
    props.type === 'small' &&
    css`
      font-size: 1rem;
      button {
        padding: 7px 1rem;
      }
      span {
        font-weight: bold;
        padding: 0px 3px;
        width: 2rem;
        font-size: 1.5rem;
      }
    `};
  font-family: 'Quicksand', sans-serif;
  display: flex;
  overflow: hidden;
  border-radius: 999px;
  justify-content: space-between;
  color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.primary};
  width: fit-content;
  button {
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button:hover {
    background-color: ${(props) => props.theme.semi};
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 5px;
    box-sizing: content-box;
  }
`;
const CountButton = ({
  className,
  id = '',
  type = 'big',
  count = 1,
  setCount,
}) => {
  const dispatch = useDispatch();

  const location = document.location.href;
  const handleCount = (type) => {
    if (location.includes('cart-preview')) {
      setDisabled(true);
    }
    switch (type) {
      case 'increase':
        if (location.includes('cart-preview')) {
          if (!disabled) {
            setCount((count) => count + 1);
            const getData = async () => {
              try {
                const response = await http.patch('carts/me', {
                  productId: id,
                  number: 1,
                  type: 'increase',
                });
                const cartData = response.data.data;
                dispatch(setNumber(cartData.products.length));
                dispatch(setProducts(cartData.products));
                dispatch(setTotalPrice(cartData.totalPrice));
              } catch (err) {
                console.log(err);
              }
            };
            getData();
          }
        } else {
          setCount((count) => count + 1);
        }
        break;
      case 'decrease':
        if (location.includes('cart-preview')) {
          if (!disabled) {
            setCount((count) => count - 1);
            const getData = async () => {
              try {
                const response = await http.patch('carts/me', {
                  productId: id,
                  number: 1,
                  type: 'decrease',
                });
                const cartData = response.data.data;
                dispatch(setNumber(cartData.products.length));
                dispatch(setProducts(cartData.products));
                dispatch(setTotalPrice(cartData.totalPrice));
              } catch (err) {
                console.log(err);
              }
            };
            getData();
          }
        } else {
          setCount((count) => count - 1);
        }
        break;
      default:
        break;
    }
  };
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisabled(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [disabled]);
  return (
    <CountStyles type={type} className={classNames(className)}>
      <button
        disabled={
          !location.includes('cart-preview') &&
          (count == 1 ? true : false && disabled)
        }
        onClick={() => handleCount('decrease')}
      >
        <i
          className={`fa-solid fa-minus ${
            disabled ? 'cursor-not-allowed' : ''
          }`}
        />
      </button>
      <span>{count}</span>
      <button
        disabled={disabled}
        className='cursor-not-allowed'
        onClick={() => handleCount('increase')}
      >
        <i
          className={`fa-solid fa-plus ${disabled ? 'cursor-not-allowed' : ''}`}
        />
      </button>
    </CountStyles>
  );
};

export default memo(CountButton);
