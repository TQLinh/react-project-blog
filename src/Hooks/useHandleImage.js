import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(
  setValue,
  getValues,
  image_name = null,
  cb
) {
  const [progress, setProress] = useState();
  const [image, setImage] = useState("");
  if (!setValue || !getValues) return;
  const handleUploadImage = (file) => {
    console.log(file);
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPrecent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProress(progressPrecent);
        // eslint-disable-next-line default-case
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
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const onSelectItem = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file?.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();
    const desertRef = ref(
      storage,
      "images/" + (image_name || getValues("image_name"))
    );
    deleteObject(desertRef)
      .then(() => {
        handleresetImage();
        console.log("delete succcess");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleresetImage = () => {
    setImage("");
    setProress(0);
    cb && cb();
  };
  return {
    image,
    setImage,
    handleresetImage,
    progress,
    handleDeleteImage,
    onSelectItem,
    handleUploadImage,
  };
}
