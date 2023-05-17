/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const UpdateIcon = ({ to }) => {
  return (
    <Link to={to} className="cursor-pointer px-3 mx-4  py-2 rounded-md border border-grayBold">
      <i className="fa-regular fa-pen-to-square" />
    </Link>
  );
};

export default UpdateIcon;
