/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components';
// import { useController } from "react-hook-form";
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

const InputStyles = styled.div`
  width: 100%;
  ${(props) =>
    props.name === 'payment' &&
    css`
      width: 10px;
      background-color: blue;
    `};
  input {
    width: 100%;
    padding: ${(props) =>
      props.hasIcon ? '16px 60px 16px 20px' : '1rem 2rem'};
    background: ${(props) => props.theme.semi};
    border-radius: 4px;
    transition: all 0.3s;
    box-sizing: border-box;
    font-size: 1.5rem;
    border: none;
    border-bottom: 3px solid transparent;
  }
  input:focus {
    border-bottom: 3px solid ${(props) => props.theme.success};
  }
  input:focus:invalid {
    border-bottom: 3px solid ${(props) => props.theme.danger};
  }
  input::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  input::-moz-input-placeholder {
    color: #b2b3bd;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const Input = ({
  name = '',
  type = 'text',
  children,
  control,
  className,
  required = true,
  value = '',
  ...props
}) => {
  const {
    field,
    formState: { error },
  } = useController({
    control,
    name,
    defaultValue: value,
    // rules: { required: true },
  });
  return (
    <InputStyles className={className} hasIcon={children ? true : false}>
      <input required={required} id={name} type={type} {...field} {...props} />
      {children ? <div className='input-icon'>{children}</div> : null}
      {error && (
        <span className='text-danger text-xl font-semibold mt-2 block'>
          Bạn chưa điền thông tin {name}
        </span>
      )}
    </InputStyles>
  );
};
Input.propTypes = {
  required: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any,
  control: PropTypes.any,
};
export default Input;
