/* eslint-disable react/prop-types */
import parse from 'html-react-parser';

const ProductContent = ({ content }) => {
  return (
    <section className='py-10 mx-[10rem] '>
      <h2 className='text-5xl py-10 font-semibold text-left'>
        Nội dung chi tiết sản phẩm
      </h2>
      <div className='entry-content'>
        <div dangerouslySetInnerHTML={{ __html: parse(content || '') }} />
      </div>
    </section>
  );
};

export default ProductContent;
