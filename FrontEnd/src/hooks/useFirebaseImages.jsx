import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../firebase-app/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { addImage } from '../../redux/slices/imageSlice.jsx';
import { isEmpty } from 'lodash';
import { addImages, removeImages } from '../../redux/slices/productSlice.jsx';

export default function useFirebaseImage(setValue, getValues, cb = null) {
  const dispatch = useDispatch();
  const images = useSelector((value) => value.product.images);

  const imageName = !isEmpty(images) ? images[images.length - 1] : '';

  const [progress, setProgress] = useState(0);
  if (!setValue || !getValues) return;

  const handleUploadImage = (file, folder) => {
    const storageRef = ref(storage, `${folder}/` + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            break;
          default:
            console.log('Nothing at all');
        }
      },
      (error) => {
        console.log('Error :', error);
        handleResetUpload();
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log({ url: downloadURL, name: file.name });
          dispatch(addImages({ url: downloadURL, name: file.name }));
        });
      },
    );
  };

  const handleSelectImage = (e, folder) => {
    const file = e.target.files[0];
    if (!file) return;
    handleUploadImage(file, folder);
  };

  const handleDeleteImage = (folder) => {
    const imageRef = ref(
      storage,
      `${folder}/` + (imageName.name || getValues('image_name')),
    );
    deleteObject(imageRef)
      .then(() => {
        console.log('Remove image successfully');
        dispatch(removeImages(imageName.name));
        setProgress(0);
        cb && cb();
      })
      .catch((error) => {
        console.log('handleDeleteImage ~ error', error);
        dispatch(addImage(''));
      });
  };

  const handleResetUpload = () => {
    dispatch(addImage(''));
    setProgress(0);
  };

  return {
    handleResetUpload,
    progress,
    addImage,
    handleSelectImage,
    handleDeleteImage,
  };
}
