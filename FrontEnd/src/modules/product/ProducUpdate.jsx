/* eslint-disable no-unused-vars */
import Button from '../../components/atoms/Button';
import Field from '../../components/atoms/Field';
import Heading from '../../components/atoms/Heading';
import Input from '../../components/atoms/Input';
import Label from '../../components/atoms/Label';
import { Controller, useForm } from 'react-hook-form';
import ImageUpload from '../../components/atoms/ImageUpload';
import useFirebaseImage from '../../hooks/useFirebaseImage';
import ReactQuill, { Quill } from 'react-quill';
import { imgbbAPI } from '../../utils/constant.js';
import axios from 'axios';
import parse from 'html-react-parser';
import { useEffect, useMemo, useState } from 'react';
import ImageUploader from 'quill-image-uploader';
import { useDispatch, useSelector } from 'react-redux';
import slugify from 'slugify';
import http from '../../services/http.js';
import { showAlert } from '../../../alerts.js';
import { setcategories } from '../../../redux/slices/categoriesSlice';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { setProduct } from '../../../redux/slices/homeSlice.jsx';
import { isEmpty, isUndefined } from 'lodash';
import { resetImage, setImages } from '../../../redux/slices/productSlice.jsx';
Quill.register('modules/imageUploader', ImageUploader);

const UpdateProduct = () => {
  const productId = useParams().id;
  const dispatch = useDispatch();
  const { categories } = useSelector((value) => value.categories);
  const { product } = useSelector((value) => value.home);
  const images = useSelector((value) => value.product.images);
  const { handleSubmit, reset, control, setValue, getValues } = useForm({
    defaultValues: {
      image: [],
      category: 'Dưỡng ẩm',
    },
  });
  const [content, setContent] = useState('');
  const handleSubmitForm = async (values) => {
    try {
      const cloneValues = { ...values };
      cloneValues.images = images;
      cloneValues.discount = parseInt(values.discount);
      cloneValues.price = parseInt(values.price);
      cloneValues.slug = slugify(cloneValues.slug || cloneValues.title, {
        lower: true,
      });
      cloneValues.description = content;
      const response = await http.patch(`products/${productId}`, cloneValues);
      if (response.data.status === 'success') {
        showAlert('success', 'Update product successfully!');
        // reset();
        // handleResetUpload();
        // setContent('');
        // dispatch(resetImage());
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };

  const { progress, handleResetUpload, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);
  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image'],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append('image', file);
          const response = await axios({
            method: 'post',
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data.data.url;
        },
      },
    }),
    [],
  );

  useEffect(() => {
    const getData = async () => {
      const response = await http.get('categories');
      const listCategory = response.data;
      dispatch(setcategories(listCategory.data));
    };
    getData();
  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {
      const response = await http.get(`products/${productId}`);
      const productData = response.data.data;
      dispatch(setProduct(productData));
      dispatch(setImages(productData.images));
    };
    getData();
  }, [dispatch, productId]);

  useEffect(() => {
    const cloneValues = { ...product, category: product.category?._id };
    reset(cloneValues);
    setContent(cloneValues.description);
  }, [product, product.length, reset]);
  const handleChange = (value) => {
    setContent(value);
  };
  if (isEmpty(product)) return null;
  return (
    <div className='bg-white rounded-2xl shadow-lg p-14 w-full'>
      <Heading>Update Product</Heading>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <section className='grid grid-cols-2 px-10 gap-x-14'>
          <Field className='row-span-3'>
            <Label>Image</Label>
            <ImageUpload
              progress={progress}
              type='file'
              folder='images'
              name='image'
              onChange={handleSelectImage}
              onDeleteImage={handleDeleteImage}
            />
            <div className='my-4 center-both gap-x-6 w-full'>
              {images &&
                images.map((image) => (
                  <img
                    className='w-[7rem] border border-primary shadow-md rounded-lg'
                    key={uuidv4()}
                    src={image?.url}
                    alt={image?.name}
                  />
                ))}
            </div>
          </Field>
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder='Title of product'
              name='title'
              minLength='5'
            />
          </Field>
          <Field>
            <Label>Overview</Label>
            <Input
              placeholder='Overview of product'
              control={control}
              name='overview'
              className='w-full'
            />
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              placeholder='Slug of product'
              control={control}
              name='slug'
              className='w-full'
            />
          </Field>
          <Field>
            <Label>Price</Label>
            <Input
              type='number'
              placeholder='Price of product'
              control={control}
              name='price'
              className='w-full'
            />
          </Field>
          <Field>
            <Label>Category</Label>
            <Controller
              name='category'
              control={control}
              rules={{ required: true }}
              defaultValue={product.category.id}
              render={({ field }) => (
                <select
                  {...field}
                  className='bg-semi px-6 py-5 rounded-md'
                  id='category'
                >
                  {categories.map((category) => (
                    <option id={category.id} key={uuidv4()} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </Field>
          <Field>
            <Label>Discount</Label>
            <Input
              required={false}
              type='number'
              placeholder='Discount of product'
              control={control}
              name='discount'
            />
          </Field>
        </section>
        <div className='mb-10'>
          <Field>
            <Label>Description</Label>
            <div className='w-full bg-white entry-content entry-content'>
              {
                <ReactQuill
                  modules={modules}
                  theme='snow'
                  value={parse(content ? content : '')}
                  // onChange={handleChange}
                />
              }
            </div>
          </Field>
        </div>
        <Button className='mx-auto block' type='submit'>
          Cập nhật
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
