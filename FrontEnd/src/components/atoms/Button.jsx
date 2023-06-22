/* eslint-disable react/prop-types */

import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { classNames } from '../../utils/common';
const ButtonStyles = styled.button`
  transition: all 0.3s;
  font-size: 1.6rem;
  font-weight: 600;
  color: white;
  padding: 1.3rem 2rem;
  border-radius: 5px;
  text-align: center;
  display: block;
  cursor: pointer;
  background-color: ${(props) => props.theme.primary};
  &:hover {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.3) 5px 5px 13px 0px;
  }
  ${(props) =>
    props.kind === 'google' &&
    css`
      color: ${(props) => props.theme.dark};
      background-color: white;
      padding: 10px 10px;
      @media (max-width: 640px) {
        padding: 5px 5px;
      }
      display: flex;
      height: fit-content;
      &:hover {
        box-shadow: rgba(0, 76, 255, 0.1) 2px 2px 10px 0px;
      }
    `};
  ${(props) =>
    props.kind === 'facebook' &&
    css`
      color: ${(props) => props.theme.white};
      background-color: #2374e1;
      padding: 10px 10px;
      display: flex;
      height: fit-content;
      @media (max-width: 640px) {
        padding: 5px 5px;
      }
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 10px 0px;
      }
    `};
  ${(props) =>
    props.kind === 'small' &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
      padding: 8px 10px;
    `};
  ${(props) =>
    props.kind === 'success' &&
    css`
      color: ${(props) => props.theme.white};
      background-color: ${(props) => props.theme.success};
      border: 1px solid white;
      padding: 13px 25px;
      margin: 1rem 0;
    `};
  ${(props) =>
    props.disabled === true &&
    css`
      cursor: not-allowed;
      position: relative;
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        background-color: #ffffffba;
        position: absolute;
        border-radius: 5px;
        overflow: hidden;
      }
    `};
`;
const Button = ({
  type = 'button',
  children,
  kind = '',
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  if (props.to !== '' && typeof props.to === 'string') {
    return (
      <NavLink to={props.to} className={classNames('', className)}>
        <ButtonStyles
          disabled={disabled}
          onClick={onClick}
          type={type}
          kind={kind}
          {...props}
        >
          {children}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles
      disabled={disabled}
      onClick={onClick}
      className={className}
      type={type}
      kind={kind}
    >
      {children}
    </ButtonStyles>
  );
};

export default memo(Button);
