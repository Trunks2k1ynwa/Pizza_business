/* eslint-disable no-unused-vars */
import styled, { css } from 'styled-components';

/* eslint-disable react/prop-types */
const SpanStyles = styled.span`
  ${(props) =>
    props.type === 'active' &&
    css`
      color: ${(props) => props.theme.white};
      background-color: #008000;
    `};
  ${(props) =>
    props.type === 'pending' &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: #fcc276;
    `};
  ${(props) =>
    props.type === 'reject' &&
    css`
      color: ${(props) => props.theme.white};
      background-color: #f0866e;
    `};
`;
export const Tag = ({ children, type = 'active' }) => {
  return (
    <SpanStyles
      type={type}
      className='bg-green-200 font-semibold px-2 py-1 border border-primary rounded-lg '
    >
      {children}
    </SpanStyles>
  );
};
