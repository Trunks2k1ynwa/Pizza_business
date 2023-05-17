/* eslint-disable react/prop-types */
import { memo } from "react";
import styled from "styled-components";

const InputStyles = styled.h1`
  font-size: 2.5rem;
  text-transform: uppercase;
  font-weight: 700;
  background-image: linear-gradient(135deg, ${(props) => props.theme.primary}, ${(props) => props.theme.success});
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 0.1rem;
  line-height: 1.5;
  display: block;
`;
const Heading = ({ children, ...props }) => {
  return <InputStyles {...props}>{children}</InputStyles>;
};

export default memo(Heading);
