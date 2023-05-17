/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ImageUpload = (props) => {
  const {
    name,
    progress = 0,
    folder = 'images',
    onDeleteImage,
    onChange,
  } = props;
  const photo = useSelector((value) => value.account.photo);
  const imageUrl = photo?.url;
  return (
    <>
      <label className='flex items-center gap-x-10 justify-center'>
        <div className='cursor-pointer group w-[10rem] border-2 border-primary rounded-full overflow-hidden aspect-square relative '>
          {!imageUrl && progress === 0 && (
            <div className='flex justify-center h-full w-full items-center text-center pointer-events-none'>
              <img
                src='/img-upload.png'
                alt='upload-img'
                className='max-w-[40px]'
              />
            </div>
          )}

          {imageUrl && (
            <Fragment>
              <img src={imageUrl} className='object-cover h-full' alt='' />
              <button
                type='button'
                className='absolute z-10 flex top-[38%] left-[38%] items-center justify-center invisible w-10 h-10 text-red-500 transition-all bg-white rounded-full cursor-pointer group-hover:opacity-100 group-hover:visible'
                onClick={() => onDeleteImage(folder)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
              </button>
            </Fragment>
          )}

          {!imageUrl && (
            <div
              className='absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress'
              style={{
                width: `${progress}%`,
              }}
            />
          )}

          {!imageUrl && (
            <div
              className='bg-primary absolute inset-0 w-full h-full transition-all opacity-0 z-9'
              style={{
                opacity: progress / 100,
              }}
            />
          )}
        </div>
        <div>
          <input
            className='overflow-hidden absolute z-[-1]'
            type='file'
            id='photo'
            form='photo'
            name={name}
            onChange={(e) => onChange(e, folder)}
          />
          <label
            className='text-xl font-medium'
            id='lablePhoto'
            htmlFor='photo'
          >
            Chọn bức ảnh
          </label>
        </div>
      </label>
    </>
  );
};
ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string,
};
export default ImageUpload;
