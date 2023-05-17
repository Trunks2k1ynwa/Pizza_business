/* eslint-disable no-unused-vars */
import ImageUpload from "../../components/atoms/ImageUpload.jsx";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase-app/firebase-config.jsx";

const HandleImage = () => {
  // Points to the root reference

  const listImage = [];
  const handleSelectImage = (e) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "Images/" + e.target.files[0].name);

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("🚀 ~ error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      },
    );
  };
  return (
    <div>
      <ImageUpload
        // image={image}
        // progress={progress}
        type="file"
        name="image"
        onChange={handleSelectImage}
        // handleDeleteImage={handleDeleteImage}
      />
    </div>
  );
};

export default HandleImage;
