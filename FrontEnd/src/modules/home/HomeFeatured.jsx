import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import { memo } from "react";
import { Title } from "@components/atoms/Title";
import SliderComponent from "@components/molecules/SliderProduct";
import CardProduct from "@components/molecules/CardProduct";

const HomeFeatured = () => {
  const listProduct = [12, 3, 45, 3, 5, 34, 45, 34, 35, 234, 5342];
  return (
    <section className="my-10">
      <Title>✨ sản phẩm nổi bật</Title>
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

export default memo(HomeFeatured);
