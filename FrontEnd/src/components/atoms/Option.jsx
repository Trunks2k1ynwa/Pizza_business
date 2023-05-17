/* eslint-disable react/prop-types */

const Option = ({ onClick, children }) => {
  return (
    <div
      className="flex items-center bg-white justify-between px-6 py-4 text-2xl transition-all rounded-md border shadow-sm my-1 cursor-pointer hover:bg-primary hover:text-white"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Option;
