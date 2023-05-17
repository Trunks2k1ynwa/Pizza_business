/* eslint-disable react/prop-types */

import { memo, useState } from "react";
import Option from "./Option.jsx";

const Dropdown = ({ data, selected, setSelected, ...props }) => {
  const [show, setShow] = useState(false);

  const toggleOptions = () => {
    setShow(!show);
  };
  const handleOptionClick = (option) => {
    setSelected(option);
    setShow(false);
  };
  return (
    <div {...props} className="relative inline-block w-full">
      <div onClick={toggleOptions} type="text" className="bg-semi px-6 py-5 rounded-md cursor-pointer w-full text-2xl">
        {selected}
      </div>
      {show && (
        <div className="mt-2 absolute z-10 overflow-y-scroll bg-semi h-[20rem] p-3 rounded-md">
          {data.map((option) => (
            <Option key={option} onClick={handleOptionClick(option)}>
              {option}
            </Option>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Dropdown);
