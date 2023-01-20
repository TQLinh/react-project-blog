import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Managementheading from "../ManagementPage/Managementheading";
import ImageUpload from "../../Images/ImageUpload";
import Field from "../../Component/Field/Field";
import Input from "../../Component/Input/Input";
import Label from "../../Component/Label/Label";
import InputPasswordToggle from "../../Component/Input/InputPasswordToggle";
import FieldCheckboxes from "../../Component/Field/FieldCheckboxes";
import Radio from "../../Component/checkbox/Radio";
import { postStaus, userRole } from "../../Component/Contrain";
import Button from "../../Component/Button/Button";
import LoadingSpinner from "../../Component/Loading/LoadingSpinner";
import useFirebaseImage from "../../Hooks/useHandleImage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase-config/firebase-config";
import { useAuth } from "../../Contexts/auth-context";

const UserUpdate = () => {
  const schame = yup.object({
    avatar: yup.string().required("Vui lòng upload image").nullable(),
    fullname: yup
      .string()
      .required("please enter your fullname ...")
      .min(10, "Vui lòng nhập tối thiểu 10 ký tự")
      .max(20, "Vui lòng không nhập quá 20 Ký tự")
      .trim(),
    username: yup
      .string()
      .required("please enter your username ...")
      .min(5, "Vui lòng nhập tối thiểu 5 kí tự.")
      .max(20, "Vui lòng không nhập quá 20 kí tự.")
      .trim(),
    email: yup
      .string()
      .required("please enter your email ...")
      .min(5, "Please enter at least 5 characters")
      .max(32, "Vui lòng không nhập quá 20 ký tự")
      .matches(/^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/, {
        message: "Email không đúng định dạng.",
      })
      .trim(),
    password: yup
      .string()
      .required("please enter your password")
      .min(8, "Please enter at least 8 characters")
      .max(20, "Please enter at leadt 20 charact")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        {
          message:
            "Vui long Tối thiểu ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt",
        }
      )
      .trim(),
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
    mode: "onChange",
    resolver: yupResolver(schame),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: 1,
      role: 1,
      comment: [],
      createAt: new Date(),
    },
  });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const imageUrl = getValues("avatar");
  const image_name = /%2F(\S+)\?/gm.exec(imageUrl)?.[1];
  const { image, setImage, progress, handleDeleteImage, onSelectItem } =
    useFirebaseImage(setValue, getValues, image_name, deleteAvatar);
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const userId = params.get("id");
  const { userInfo, setUserInfo } = useAuth();
  const handleUpdateUser = async (values) => {
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, { ...values, avatar: image });
      if (userInfo.id === userId) {
        setUserInfo({ ...userInfo, ...values, avatar: image });
      }
      toast.success("update succcessflly!");
      navigate("/manage/user");
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  console.log("errors:", errors);
  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, { avatar: "" });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      reset(docData && docData?.data());
      // console.log(docData.data());
    }
    fetchData();
  }, [reset, userId]);
  if (!userId) return null;
  return (
    <div>
      <Managementheading
        title="Manage update User"
        desc="Manage update your user"
      ></Managementheading>

      <form autoComplete="off" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            className="!rounded-full w-full h-full"
            type="file"
            name="avatar"
            image={image}
            progress={progress}
            onChange={onSelectItem}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
          {errors.avatar && (
            <p className="text-sm text-red-600">{errors.avatar.message}</p>
          )}
        </div>
        <div className="form-layout">
          <div>
            <Field className="mt-5 fullname">
              <Input name="fullname" control={control} type="text"></Input>
              <Label htmlFor="fullname">Fullname</Label>
            </Field>
            {errors.fullname && (
              <p className="text-sm text-red-600">{errors.fullname.message}</p>
            )}
          </div>
          <div>
            <Field className="mt-5 username">
              <Input name="username" control={control} type="text"></Input>
              <Label htmlFor="username">Username</Label>
            </Field>
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Field className="mt-5 email">
              <Input name="email" control={control} type="email"></Input>
              <Label htmlFor="email">Email</Label>
            </Field>
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Field className="mt-5 password">
              <InputPasswordToggle
                name="password"
                control={control}
                type="text"
              ></InputPasswordToggle>
            </Field>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="form-layout">
            <Field className="top-3">
              <label
                className="relative font-semibold text-black"
                htmlFor="status"
              >
                Status:
              </label>
              <FieldCheckboxes className="flex-nowrap top-2 !flex-row">
                <Radio
                  name="status"
                  checked={Number(watchStatus) === postStaus.APPROVED}
                  control={control}
                  value={postStaus.APPROVED}
                >
                  Active
                </Radio>
                <Radio
                  name="status"
                  checked={Number(watchStatus) === postStaus.PENDING}
                  control={control}
                  value={postStaus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  checked={Number(watchStatus) === postStaus.REJECT}
                  control={control}
                  value={postStaus.REJECT}
                >
                  Banned
                </Radio>
              </FieldCheckboxes>
            </Field>
          </div>
          <div className="form-layout">
            <Field className="top-3">
              <label
                className="relative font-semibold text-black"
                htmlFor="status"
              >
                Role:
              </label>
              <FieldCheckboxes className="flex-nowrap top-2 !flex-row">
                <Radio
                  name="role"
                  checked={Number(watchRole) === userRole.ADMIN}
                  control={control}
                  value={userRole.ADMIN}
                >
                  Admin
                </Radio>
                <Radio
                  name="role"
                  checked={Number(watchRole) === userRole.MODERATOR}
                  control={control}
                  value={userRole.MODERATOR}
                >
                  Moderator
                </Radio>
                <Radio
                  name="role"
                  checked={Number(watchRole) === userRole.USER}
                  control={control}
                  value={userRole.USER}
                >
                  User
                </Radio>
              </FieldCheckboxes>
            </Field>
          </div>
        </div>
        <Button
          // kind="primary"
          // disabled={isSubmitting}
          // isLoading={isSubmitting}
          className="mx-auto max-w-[200px]"
          type="submit"
        >
          {isSubmitting ? <LoadingSpinner></LoadingSpinner> : "Update user"}
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
