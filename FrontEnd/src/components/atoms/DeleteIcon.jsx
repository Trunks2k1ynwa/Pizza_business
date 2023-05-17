/* eslint-disable react/prop-types */

const DeleteIcon = ({ onClick }) => {
  return (
    <span onClick={onClick} className="cursor-pointer px-3 py-2 rounded-md border border-grayBold">
      <i className="fa-regular fa-trash-can" />
    </span>
  );
};

export default DeleteIcon;
