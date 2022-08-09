import React from "react";
import Button from "../../Component/Button/Button";
import Radio from "../../Component/checkbox/Radio";
import Field from "../../Component/Field/Field";
import FieldCheckboxes from "../../Component/Field/FieldCheckboxes";
import Input from "../../Component/Input/Input";
import Label from "../../Component/Label/Label";
import { db } from "../../firebase-config/firebase-config";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import LoadingSpinner from "../../Component/Loading/LoadingSpinner";
import Managementheading from "../ManagementPage/Managementheading";
import { useAuth } from "../../Contexts/auth-context";
const UserCreateCategory = () => {
  const schame = yup.object({
    name: yup.string().required("Plese enter your category name "),
    slug: yup
      .string()
      .min(4, "Please enter at least four characters")
      .required("Please enter your category slug"),
  });
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schame),
    defaultValues: {
      name: "",
      slug: "",
      status: 2,
      createAt: new Date(),
    },
  });
  const { handleAddnotification, userInfo } = useAuth();
  const { avatar, email, role } = userInfo;
  const watchStatus = watch("status");
  const handleAddCategory = async (values) => {
    const newValues = { ...values };
    newValues.slug = slugify(newValues.title || newValues.slug, {
      lower: true,
    });
    newValues.status = Number(newValues.status);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...newValues,
        createAt: serverTimestamp(),
      });
      if (Number(role) === 3 || Number(role) === 2) {
        handleAddnotification({
          createAt: new Date(),
          email: email,
          avatar: avatar,
          title: `<p className="text-green-400">${email} đã tạo thêm category (${values.name})</p>`,
        });
      }
      toast.success("create category success");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 2,
        createAt: new Date(),
      });
    }
  };
  return (
    <div>
      <Managementheading
        title="Create category"
        desc="Create category for posts"
      ></Managementheading>
      <form autoComplete="off" onSubmit={handleSubmit(handleAddCategory)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <div>
            <Field>
              <Input control={control} name="name" type="text"></Input>
              <Label>Name - category</Label>
            </Field>
            {errors.name && (
              <p className="text-sm text-red-600"> {errors?.name.message}</p>
            )}
          </div>
          <div>
            <Field>
              <Input control={control} name="slug" type="text"></Input>
              <Label>slug</Label>
            </Field>
            {errors.slug && (
              <p className="text-sm text-red-600"> {errors?.slug.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <FieldCheckboxes>
            <label className="font-semibold">Status</label>
            <div className="flex flex-warp gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 1}
                value={1}
                disabled
              >
                Approved
              </Radio>
              <Radio
                disabled
                name="status"
                checked={Number(watchStatus) === 2}
                control={control}
                value={2}
              >
                Unapproved
              </Radio>
            </div>
          </FieldCheckboxes>
        </div>

        <Button type="submit" className="mx-auto max-w-[250px]">
          {!isSubmitting ? "Add category" : <LoadingSpinner></LoadingSpinner>}
        </Button>
      </form>
    </div>
  );
};

export default UserCreateCategory;
