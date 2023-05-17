/* eslint-disable react/prop-types */
import styled from "styled-components";

const LabelStyles = styled.label`
  color: ${(props) => props.theme.primary};
  font-weight: 500;
  font-size: 1.8rem;
  padding: 0.5rem 0rem;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;
