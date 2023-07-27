import React, { useEffect, useMemo, useState } from "react";
import Managementheading from "../ManagementPage/Managementheading";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import slugity from "slugify";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Field from "../../Component/Field/Field";
import Input from "../../Component/Input/Input";
import Label from "../../Component/Label/Label";
import ImageUpload from "../../Images/ImageUpload";
import Dropdown from "../../Component/dropdown/Dropdown";
import Select from "../../Component/dropdown/Select";
import ReactQuill from "react-quill";
import axios from "axios";
import Button from "../../Component/Button/Button";
import FieldCheckboxes from "../../Component/Field/FieldCheckboxes";
import Radio from "../../Component/checkbox/Radio";
import Toggle from "../../Component/toggle/Toggle";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useAuth } from "../../Contexts/auth-context";
import { db } from "../../firebase-config/firebase-config";
import { postStaus } from "../../Component/Contrain";
import List from "../../Component/dropdown/List";
import Option from "../../Component/dropdown/Option";
import LoadingSpinner from "../../Component/Loading/LoadingSpinner";
import useFirebaseImage2 from "../../Hooks/useUploadImg";
const PostAddNew = () => {
  const { userInfo } = useAuth();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  console.log("category: ", category);
  const [content, setContent] = useState("");
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
    // content: yup
    //   .string()
    //   .required("vui lòng nhập content cho bài ")
    //   .min(100, "Không được nhập ít hơn 100 ký tự"),
  });
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      image: "",
      category: "",
      hot: false,
      content: "",
      user: {},
      favourite: false,
    },
    // resolver: yupResolver(schame),
  });
  console.log("errors", errors);
  useEffect(() => {
    setValue("content", content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);
  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return;
      // const colRef = doc(db, "users", userInfo.uid);
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);
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
  const {
    image,
    handleresetImage,
    progress,
    handleDeleteImage,
    onSelectItem,
    handleUploadImage,
  } = useFirebaseImage2(setValue, getValues);

  const addPostHandler = async (values) => {
    console.log("values: ", values);
    try {
      const closeValues = { ...values };
      closeValues.slug = slugity(values.slug || values.title, { lower: true });
      closeValues.status = Number(closeValues.status);
      const colRef = collection(db, "posts");
      // await handleUploadImage(closeValues.image);
      await addDoc(colRef, {
        ...closeValues,
        image: image,
        content: content,
        // categoryid: closeValues.category.id,
        userId: userInfo.id,
        createAt: serverTimestamp(),
        favourite: false,
      });
      console.log("res", {
        ...closeValues,
        image: image,
        content: content,
        categoryid: category.id,
        userId: userInfo.id,
        createAt: serverTimestamp(),
        favourite: false,
      });
      toast.success("Create new post success");
      reset({
        title: "",
        slug: "",
        status: 2,
        image: null,
        category: {},
        hot: false,
        user: {},
        content: "",
        // handleresetImage,
      });
      handleDeleteImage();
      setCategory("");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const p = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(p);
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", `{${docData.data().name}}`);
    setCategory(item);
  };
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  return (
    <div>
      <Managementheading
        title="Manage add post"
        desc="Add your new post"
      ></Managementheading>
      <form autoComplete="off" onSubmit={handleSubmit(addPostHandler)}>
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
              <label className="font-medium text-black">Upload image</label>
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
                    category?.name ? category.name : "select a category"
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
            </Field>
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
                  // formats={formats}
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
          {isSubmitting ? <LoadingSpinner></LoadingSpinner> : " Add post new"}
        </Button>
      </form>
    </div>
  );
};

export default PostAddNew;
