import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Field from "../Component/Field/Field";
import Input from "../Component/Input/Input";
import Label from "../Component/Label/Label";
import Button from "../Component/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "../Component/Input/InputPasswordToggle";
import LoadingSpinner from "../Component/Loading/LoadingSpinner";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config/firebase-config";
import { useAuth } from "../Contexts/auth-context";
import { v1 as uid } from "uuid";
const RegisterPage = () => {
  const Navigate = useNavigate();
  const { setValue } = useAuth();
  useEffect(() => {
    document.title = "Personal-post-register";
  }, []);
  const schame = yup.object({
    fullname: yup.string().required("please enter your fullname ..."),
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
    conf_pass: yup.string().required("please confirm password"),
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schame),
    mode: "onChange",
  });

  const handleRegisterForm = async (values) => {
    if (!isValid) return;
    console.log(values);
    //tạo user với email and pass
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1652457726892-fda31af96849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      // id: uid(),
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: values.fullname,
      avatar:
        "https://images.unsplash.com/photo-1652457726892-fda31af96849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      status: 1,
      role: 3,
      comment: "",
      createAt: serverTimestamp(),
    });
    // const colRef = collection(db, "users");
    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password,
    //   username: values.fullname,
    //   avatar:
    //     "https://images.unsplash.com/photo-1652457726892-fda31af96849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    //   status: 1,
    //   role: 3,
    //   comment: "",
    //   createAt: serverTimestamp(),
    // });
    // setValue(values);
    toast.success(`create user succcess!`);
    Navigate("/signInPage");
  };
  return (
    <AuthenticationPage>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleRegisterForm)}
        className="relative mx-auto form top-6"
      >
        <Field className="fullname">
          <Input name="fullname" control={control} type="text"></Input>
          <Label htmlFor="fullname">Fullname</Label>
        </Field>
        {errors.fullname && (
          <p className="text-sm text-red-600">{errors.fullname.message}</p>
        )}
        <Field className="mt-5 email">
          <Input name="email" control={control} type="text"></Input>
          <Label htmlFor="email">Email</Label>
        </Field>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
        <Field className="mt-5 password">
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
        <Field className="mt-5 conf_pass">
          <Input name="conf_pass" control={control} type="password"></Input>
          <Label htmlFor="conf_pass">Confirm Password</Label>
        </Field>
        {errors.conf_pass && (
          <p className="text-sm text-red-600">{errors.conf_pass.message}</p>
        )}
        <div className="flex items-center mt-2 have-account gap-x-1">
          <p>Bạn đã có tài khoản đăng nhập tại đây ?</p>
          <Link to={"/signInPage"} className="text-red-400 ">
            Logn-In
          </Link>
        </div>
        <Button type="submit">
          {isSubmitting ? <LoadingSpinner></LoadingSpinner> : <p> Register</p>}
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default RegisterPage;
