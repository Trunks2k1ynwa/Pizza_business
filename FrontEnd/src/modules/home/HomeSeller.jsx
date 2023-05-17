import { Title } from "../../components/atoms/Title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderComponent from "../../components/molecules/SliderProduct";
import { v4 as uuidv4 } from "uuid";
import { memo } from "react";
import CardProduct from "../../components/molecules/CardProduct.jsx";

const HomeSeller = () => {
  const listProduct = [
    {
      id: "2425235",
      url: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      title: "Sữa tắm",
      content: "Sửa rửa mặt mát lạnh trắng mịn da không lo mụn mọc",
      price: 125000,
      sale: 20,
    },
    {
      id: "24gff235",
      url: "https://image.hsv-tech.io/400x0/tfs/common/c28e8df6-1206-4539-9eb6-a51fcbb793ad.webp",
      title: "Kem dưỡng",
      content: "Kem dưỡng sáng da Yehwadam",
      price: 343000,
      sale: 10,
    },
    {
      id: "2vgef235",
      url: "https://image.hsv-tech.io/400x0/tfs/common/f3177911-efb8-4bef-9ad9-416d7bfa6092.webp",
      title: "Sữa tắm",
      content: "Dưỡng cơ thể Grapfruit",
      price: 345000,
      sale: 10,
    },
    {
      id: "DS3243",
      url: "https://image.hsv-tech.io/400x0/tfs/common/a4bc5b25-d7bc-421d-b087-13849efedced.webp",
      title: "Kem dưỡng",
      content: "Phấn nước trang điểm Ink Lasting",
      price: 249000,
      sale: 20,
    },
    {
      id: "24ttef235",
      url: "https://image.hsv-tech.io/400x0/tfs/products/a4e02bff-1d73-4d03-8772-8622ae7a29e3.webp",
      title: "Kem dưỡng",
      content: "Dưỡng cơ da tay hương hoa mới",
      price: 469000,
      sale: 30,
    },
  ];
  return (
    <section className="my-10">
      <Title>💥 top sản phẩm bán chạy</Title>
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

export default memo(HomeSeller);
