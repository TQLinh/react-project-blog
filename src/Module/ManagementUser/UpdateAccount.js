import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFirebaseImage from "../../Hooks/useHandleImage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingSpinner from "../../Component/Loading/LoadingSpinner";
import Button from "../../Component/Button/Button";
import Radio from "../../Component/checkbox/Radio";
import { postStaus, userRole } from "../../Component/Contrain";
import FieldCheckboxes from "../../Component/Field/FieldCheckboxes";
import Field from "../../Component/Field/Field";
import Input from "../../Component/Input/Input";
import Label from "../../Component/Label/Label";
import ImageUpload from "../../Images/ImageUpload";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config";
import { toast } from "react-toastify";
import InputPasswordToggle from "../../Component/Input/InputPasswordToggle";
import { useAuth } from "../../Contexts/auth-context";
const UpdateAccount = () => {
  const [params] = useSearchParams();
  const Navigate = useNavigate();
  const { setUserInfo: setUser } = useAuth();
  const schame = yup.object({
    fullname: yup.string().required("please enter your fullname ..."),
    username: yup.string().required("please enter your username ..."),
    email: yup
      .string()
      .email("plaese enter valid email")
      .matches(/^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/, {
        message: "Email không hợp lệ",
      })
      .required("please enter your email ..."),
    password: yup
      .string()
      .min(8, "Please enter at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        {
          message:
            "Vui long Tối thiểu ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt",
        }
      )
      .required("please enter your useName"),
  });
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting, isValid, errors },
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
  const imageUrl = getValues("avatar");
  const image_name = /%2F(\S+)\?/gm.exec(imageUrl)?.[1];
  const { image, setImage, progress, handleDeleteImage, onSelectItem } =
    useFirebaseImage(setValue, getValues, image_name, deleteAvatar);
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const userId = params.get("id");
  const handleUpdateUser = async (values) => {
    try {
      const colRef = doc(db, "users", userId);
      // if(userId=== )
      await updateDoc(colRef, { ...values, avatar: image });
      setUser({ id: userId, ...values, avatar: image });
      toast.success("update succcessflly!");
      Navigate("/AccountManagement/user");
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, { avatar: "" });
    toast.success("update succcessflly!");
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
      {/* <Managementheading
        title="Manage update User"
        desc="Manage update your user"
      ></Managementheading> */}

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
              <Input
                name="email"
                disabled
                control={control}
                type="email"
                className="opacity-70"
              ></Input>
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
                  disabled
                  name="status"
                  checked={Number(watchStatus) === postStaus.PENDING}
                  control={control}
                  value={postStaus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  disabled
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
                  disabled
                  name="role"
                  checked={Number(watchRole) === userRole.ADMIN}
                  control={control}
                  value={userRole.ADMIN}
                >
                  Admin
                </Radio>
                <Radio
                  disabled
                  name="role"
                  checked={Number(watchRole) === userRole.MODERATOR}
                  control={control}
                  value={userRole.MODERATOR}
                >
                  Moderator
                </Radio>
                <Radio
                  disabled
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

export default UpdateAccount;
