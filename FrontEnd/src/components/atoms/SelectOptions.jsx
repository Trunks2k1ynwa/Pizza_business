/* eslint-disable react/prop-types */
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
const SelectOptionsStyles = styled.select`
  background: ${(props) => props.theme.semi};
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 4px;
  margin: 0.5rem 0;
  option {
    padding: 0.5rem 1rem;
  }
`;
export const SelectOptions = ({ name = "", id = "", data = [] }) => {
  return (
    <SelectOptionsStyles name={name} id={id}>
      {data.map((dataItem) => (
        <option key={uuidv4()} value={dataItem}>
          {dataItem}
        </option>
      ))}
    </SelectOptionsStyles>
  );
};
