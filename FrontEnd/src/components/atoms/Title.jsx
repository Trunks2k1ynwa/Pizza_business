/* eslint-disable react/prop-types */
import styled from 'styled-components';

const InputStyles = styled.h2`
  font-size: 2.25rem;
  text-transform: uppercase;
  font-weight: 700;
  /* background-image: linear-gradient(
    135deg,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.success}
  ); */
  /* -webkit-background-clip: text; */
  color: ${(props) => props.theme.primary};
  line-height: 2;
  text-align: center;
  position: relative;
  /* &:before {
    content: '';
    position: absolute;
    height: 4px;
    width: 20rem;
    background-color: ${(props) => props.theme.primary};
    top: 4rem;
    z-index: -1;
    transform: translateX(10rem);
  } */
`;

export const Title = ({ children, ...props }) => {
  return <InputStyles {...props}>{children}</InputStyles>;
};
