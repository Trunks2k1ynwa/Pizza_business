/* eslint-disable react/prop-types */
import Skeleton from 'react-loading-skeleton';

const CardProductSkeleton = ({ cards }) => {
  return (
    <section>
      {new Array(cards).fill(0).map((card, i) => (
        <div key={i}>
          <div className='bg-black h-4 w-4'>
            <Skeleton circle width={400} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default CardProductSkeleton;
