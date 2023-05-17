/* eslint-disable react/prop-types */
import { useController } from 'react-hook-form';
import styled from 'styled-components';

const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: 16px 20px;
    background-color: ${(props) => props.theme.semi};
    border-radius: 8px;
    transition: all 0.3s;
    color: ${(props) => props.theme.black};
    font-size: 1.4rem;
    min-height: 15rem;
  }
  textarea::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  textarea::-moz-input-placeholder {
    color: #b2b3bd;
  }
`;
/**
 *
 * @param {*} placeholder(optional) - Placeholder of Textarea
 * @param {*} name(optional) - name of Textarea
 * @param {*} control - control from react hook form
 * @returns Textarea
 */
const Textarea = ({
  name = '',
  type = 'text',
  children,
  className,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });
  return (
    <TextareaStyles className={className}>
      <textarea {...field} id={name} type={type} {...props}>
        {children}
      </textarea>
    </TextareaStyles>
  );
};

export default Textarea;
