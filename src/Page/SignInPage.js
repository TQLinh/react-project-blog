import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Button from "../Component/Button/Button";
import Field from "../Component/Field/Field";
import Input from "../Component/Input/Input";
import InputPasswordToggle from "../Component/Input/InputPasswordToggle";
import Label from "../Component/Label/Label";
import LoadingSpinner from "../Component/Loading/LoadingSpinner";
import AuthenticationPage from "./AuthenticationPage";
import { useAuth } from "../Contexts/auth-context";
import { db } from "../firebase-config/firebase-config";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import IconQuestion from "../Component/Icon/IconQuestion";
const SignInPage = () => {
  useEffect(() => {
    document.title = "Personal-post-register";
  }, []);
  const schame = yup.object({
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Vui long Tối thiểu ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt",
        }
      )
      .required("please enter your useName"),
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schame),
    mode: "onChange",
  });
  const [userList, setUserList] = useState([]);
  const { setUserInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshots) => {
      const results = [];
      snapshots.forEach((doc) => {
        results.push({ ...doc.data() });
      });
      setUserList(results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(userList);
  const handleLognIn = async (values) => {
    userList.forEach(async (user) => {
      if (user.email === values.email && user.password === values.password) {
        const colRef = collection(db, "users");
        const q = query(colRef, where("email", "==", values.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserInfo({ id: doc.id, ...doc.data() });
        });
        navigate("/");
        toast.success("Đăng nhập thành công !");
      } else {
        // toast.warning("Tài khoản hoặc mật khẩu ko đúng !");
        console.log("lỗi");
      }
    });
  };
  return (
    <AuthenticationPage>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleLognIn)}
        className="relative mx-auto form "
      >
        <Field className="email">
          <Input name="email" control={control} type="text"></Input>
          <Label htmlFor="email">Email</Label>
        </Field>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
        <Field className="mt-4 password">
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
        <div className="flex items-center mt-2 gap-x-1 have-account">
          <p> Bạn chưa có tài khoản đăng ký tại đây ? </p>
          <Link to={"/registerPage"} className="font-semibold text-purple-500">
            Register
          </Link>
        </div>
        <Button type="submit">
          {isSubmitting ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <p className="text-base"> Register</p>
          )}
        </Button>
        <div className="flex items-center justify-end mt-2x gap-x-1 have-account">
          <Link
            to={"/forgot-password"}
            className="flex items-center font-semibold gap-x-1 text-sky-600"
          >
            <span> Forgot password</span> <IconQuestion></IconQuestion>
          </Link>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
