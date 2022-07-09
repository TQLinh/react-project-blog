import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import slugify from "slugify";
import Button from "../../Component/Button/Button";
import Radio from "../../Component/checkbox/Radio";
import Field from "../../Component/Field/Field";
import FieldCheckboxes from "../../Component/Field/FieldCheckboxes";
import Input from "../../Component/Input/Input";
import Label from "../../Component/Label/Label";
import { db } from "../../firebase-config/firebase-config";
import Managementheading from "../ManagementPage/Managementheading";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const CategoryUpdate = () => {
  const schame = yup.object({
    name: yup.string().required("Please enter your category name "),
    slug: yup
      .string()
      .min(4, "Please enter at least four characters")
      .required("Please enter your category slug"),
  });
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const categorisId = params.get("id");
  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schame),
    defaultValues: { name: "", slug: "", status: 1, createAt: new Date() },
  });
  const watchStatus = watch("status");
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categorisId);
      const getData = await getDoc(colRef);
      reset(getData.data());
    }
    fetchData();
  }, [categorisId, reset]);

  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "categories", categorisId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    toast.success("update catedory successfully");
    navigate("/manage/category");
  };
  return (
    <div>
      <Managementheading
        title="Manage update category"
        desc="Manage your category"
      ></Managementheading>
      <form autoComplete="off" onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <div>
            <Field>
              <Input control={control} name="name" type="text"></Input>
              <Label>Name</Label>
            </Field>
            {errors?.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Field>
              <Input control={control} name="slug" type="text"></Input>
              <Label>slug</Label>
            </Field>
            {errors?.slug && (
              <p className="text-sm text-red-600">{errors.slug.message}</p>
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
              >
                Approved
              </Radio>
              <Radio
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
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
