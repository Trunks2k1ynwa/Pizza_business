/* eslint-disable react/prop-types */
import styled from "styled-components";
const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 5px;
  margin-bottom: 2rem;
`;
const Field = ({ children, className }) => {
  return <FieldStyles className={className}>{children}</FieldStyles>;
};

export default Field;
