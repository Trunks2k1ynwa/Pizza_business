/* eslint-disable react/prop-types */
import { memo } from "react";
import { v4 as uuidv4 } from "uuid";

const HomeBanner = ({ listBanner, className }) => {
  return (
    <section className={`overflow-hidden justify-center flex gap-10 sm:gap-y-10 flex-col md:flex-row  ${className}`}>
      {listBanner.map((banner) => (
        <div
          key={uuidv4()}
          className="cursor-pointer overflow-hidden hover:shadow-md hover:bg-primaryF4 rounded-md transition-all border-primary border hover:brightness-75"
        >
          <img className="bg-cover" src={banner.path} alt="" />
        </div>
      ))}
    </section>
  );
};

export default memo(HomeBanner);
