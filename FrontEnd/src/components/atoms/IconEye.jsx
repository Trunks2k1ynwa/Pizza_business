import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const IconEye = ({ to }) => {
  return (
    <Link to={to} className="cursor-pointer px-3 py-2 rounded-md border border-grayBold">
      <i className="fa-regular fa-eye" />
    </Link>
  );
};

export default IconEye;
