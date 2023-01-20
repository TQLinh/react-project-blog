import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ReactQuill from "react-quill";
import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../Component/Button/Button";
import Radio from "../../Component/checkbox/Radio";
import { postStaus } from "../../Component/Contrain";
import Dropdown from "../../Component/dropdown/Dropdown";
import List from "../../Component/dropdown/List";
import Option from "../../Component/dropdown/Option";
import Select from "../../Component/dropdown/Select";
import Field from "../../Component/Field/Field";
import FieldCheckboxes from "../../Component/Field/FieldCheckboxes";
import Input from "../../Component/Input/Input";
import Label from "../../Component/Label/Label";
import Toggle from "../../Component/toggle/Toggle";
import ImageUpload from "../../Images/ImageUpload";
import Managementheading from "../ManagementPage/Managementheading";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../Component/Loading/LoadingSpinner";
import useFirebaseImage2 from "../../Hooks/useUploadImg";

const PostUpdate = () => {
  const schame = yup.object({
    title: yup
      .string()
      .required("please enter title post name")
      .min(10, "Please enter at least 10 characters")
      .max(70, "Vui lòng không nhập quá 70 kí tự"),
    slug: yup
      .string()
      .required("Vui lòng nhập slug")
      .min(10, "Vui lòng không nhập dưới 10 ký tự")
      .max(70, "Vui lòng không nhập quá 70 ký tự")
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "không đúng định dạng",
      }),
    category: yup.string().required("vui lòng chọn category"),
    image: yup.string().required("Vui lòng upload ảnh ").nullable(),
    content: yup
      .string()
      .required("vui lòng nhập content cho bài ")
      .min(100, "Không được nhập ít hơn 100 ký tự")
      .max(1000, "không đươc nhập quá 1000 ký tự"),
  });
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schame),
  });
  console.log("errors: ", errors);
  const Navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [params] = useSearchParams();
  const imageUrl = getValues("image");
  const postId = params.get("id");
  const image_name = /%2F(\S+)\?/gm.exec(imageUrl)?.[1];
  const { image, setImage, progress, handleDeleteImage, onSelectItem } =
    useFirebaseImage2(setValue, getValues, image_name, deleteAvatar);
  useEffect(() => {
    async function fetchDataPost() {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnapShot = await getDoc(docRef);
      if (docSnapShot.data()) {
        reset(docSnapShot.data());
        setCategory(docSnapShot?.data()?.category);
        setContent(docSnapShot.data().content);
        setValue("category", docSnapShot.data().category);
      }
    }
    fetchDataPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, reset]);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  const handleUpdatePost = async (values) => {
    try {
      const colRef = doc(db, "posts", postId);
      await updateDoc(colRef, { ...values, image: image, content: content });
      toast.success("update succcessflly!");
      Navigate("/manage/post");
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  async function deleteAvatar() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, { image: "" });
  }
  useEffect(() => {
    async function getDataCategory() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const dataCategories = await getDocs(q);
      const listCate = [];
      dataCategories.forEach((doc) => {
        listCate.push({ id: doc.id, ...doc.data() });
      });
      setCategories(listCate);
    }
    getDataCategory();
  }, []);
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", `{${docData.data().name}}`);
    setCategory(item);
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=7a5451b977d4d9f4889021e462acb352",
            data: bodyFormData,
            headers: {
              "Content-type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const watchHot = watch("hot");
  const watchStatus = watch("status");

  if (!postId) return;
  return (
    <div>
      <Managementheading
        title="Manage update post"
        desc="Update your  post"
      ></Managementheading>
      <form autoComplete="off" onSubmit={handleSubmit(handleUpdatePost)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <div>
            <Field>
              <Input control={control} name="title" type="text"></Input>
              <Label>Title-post</Label>
            </Field>
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Field>
              <Input control={control} name="slug" type="text"></Input>
              <Label>Slug</Label>
            </Field>
            {errors.slug && (
              <p className="text-sm text-red-600">{errors.slug.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <div>
            <Field>
              <label className="font-medium text-black">Slug</label>
              <ImageUpload
                type="file"
                name="image"
                image={image}
                progress={progress}
                onChange={onSelectItem}
                handleDeleteImage={handleDeleteImage}
              ></ImageUpload>
            </Field>
            {errors.image && (
              <p className="text-sm text-red-600">{errors.image.message}</p>
            )}
          </div>

          <div>
            <Field>
              <label className="font-medium text-black">Category</label>
              <Dropdown>
                <Select
                  placeholder={
                    category ? category || category?.name : "select a category"
                  }
                ></Select>
                <List>
                  {categories.map((item) => (
                    <Option
                      onClick={() => handleClickOption(item)}
                      key={item.id}
                    >
                      {item.name}
                    </Option>
                  ))}
                </List>
              </Dropdown>
            </Field>{" "}
            {errors.category && (
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>
        </div>
        <div className="mt-2">
          <Field className="!w-full mt-4">
            <div className="w-full">
              <label className="text-base font-medium">Content:</label>
              <div className="mt-1">
                <ReactQuill
                  setValue={setValue("content", content)}
                  modules={modules}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                />
              </div>
              {errors.content && (
                <p className="text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>
          </Field>
        </div>
        <div className="grid grid-cols-2 mt-3 mb-10 gap-x-10">
          <Field className="flex flex-col">
            <label className="font-medium text-black">Feature post</label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <label className="font-medium text-black">Status</label>
            <FieldCheckboxes className="flex !flex-row">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStaus.APPROVED}
                value={postStaus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStaus.PENDING}
                value={postStaus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStaus.REJECT}
                value={postStaus.REJECT}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button type="submit" className={"w-[200px]"}>
          {isSubmitting ? <LoadingSpinner></LoadingSpinner> : " Update post"}
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
