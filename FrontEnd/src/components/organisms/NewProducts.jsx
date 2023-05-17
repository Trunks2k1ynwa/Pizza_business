// import { Title } from "../atoms/Title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderComponent from "../molecules/SliderProduct";
import CardProduct from "../molecules/CardProduct";
import { v4 as uuidv4 } from "uuid";
import { Title } from "../../atoms/Title";

const NewProducts = () => {
  const listProduct = [12, 3, 45, 3, 5, 34, 45, 34, 35, 234, 5342];
  return (
    <div className="my-10">
      <Title>❤️‍🔥 sản phẩm mới ra mắt</Title>
      <SliderComponent className="w-[95%]">
        {listProduct.map((product) => (
          <div key={uuidv4()}>
            <CardProduct productInfo={product} />
          </div>
        ))}
      </SliderComponent>
    </div>
  );
};

export default NewProducts;
