/* eslint-disable react/prop-types */

import { memo } from "react";

const Avatar = ({ imgUrl }) => {
  return <img className="h-16 w-16 p-1 border-2 border-success rounded-full border-box" alt="avatar" src={imgUrl} />;
};

export default memo(Avatar);
