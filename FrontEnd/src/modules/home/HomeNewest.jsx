// import { Title } from "../atoms/Title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderComponent from "@components/molecules/SliderProduct";
import CardProduct from "@components/molecules/CardProduct";
import { v4 as uuidv4 } from "uuid";
import { Title } from "@components/atoms/Title";
import { memo } from "react";

const HomeNewest = () => {
  const listProduct = [12, 3, 45, 3, 5, 34, 45, 34, 35, 234, 5342];
  return (
    <section className="my-10">
      <Title>❤️‍🔥 sản phẩm mới ra mắt</Title>
      <SliderComponent className="w-[95%]">
        {listProduct.map((product) => (
          <div key={uuidv4()}>
            <CardProduct productInfo={product} />
          </div>
        ))}
      </SliderComponent>
    </section>
  );
};

export default memo(HomeNewest);
