import PropTypes from 'prop-types';
import { classNames } from '../../utils/common';
const ButtonIcon = ({ children, className, onClick }) => {
  return (
    <button
      className={classNames(
        'text-primary aspect-square text-2xl bg-primary bg-opacity-50 center-both px-3 rounded-md transition-all hover:bg-primary hover:text-white',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
ButtonIcon.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
export default ButtonIcon;
