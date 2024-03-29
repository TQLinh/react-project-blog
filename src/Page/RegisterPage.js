import React, { useEffect, useState } from "react";
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
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config/firebase-config";
import { useAuth } from "../Contexts/auth-context";
const RegisterPage = () => {
  const Navigate = useNavigate();
  // const [checkPass, setCheckPass] = useState("");

  const { handleAddnotification } = useAuth();
  useEffect(() => {
    document.title = "Personal-post-register";
  }, []);

  const schame = yup.object({
    fullname: yup
      .string()
      .required("please enter your fullname ...")
      .min(10, "Vui lòng nhập tối thiểu 10 ký tự")
      .max(20, "Vui lòng không nhập quá 20 Ký tự")
      .trim(),
    email: yup
      .string()
      .required("please enter your email ...")
      .min(5, "Please enter at least 5 characters")
      .max(32, "Vui lòng không nhập quá 20 ký tự")
      .matches(/^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/, {
        message: "Email không đúng định dạng.",
      }),
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
      ),
    conf_pass: yup
      .string()
      .required("please confirm password")
      .min(8, "Please enter at least 8 characters")
      .max(20, "Please enter at leadt 20 charact")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Vui long Tối thiểu ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt",
        }
      ),
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schame),
    mode: "all",
  });
  const handleRegisterForm = async (values) => {
    // setCheckPass(values.password);
    if (!isValid) return;
    //tạo user với email and pass
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1652457726892-fda31af96849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
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
    handleAddnotification({
      createAt: new Date(),
      email: values.email,
      avatar:
        "https://images.unsplash.com/photo-1652457726892-fda31af96849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      title: `<p className="text-green-400">${values.email} vừa tạo tài khoản</p>`,
    });
    toast.success(`create user succcess!`);
    Navigate("/signInPage");
  };

  return (
    <AuthenticationPage>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleRegisterForm)}
        className="relative mx-auto form "
      >
        <Field className="fullname">
          <Input name="fullname" control={control} type="text"></Input>
          <Label htmlFor="fullname">Fullname</Label>
        </Field>
        {errors.fullname && (
          <p className="text-sm text-red-600">{errors.fullname.message}</p>
        )}
        <Field className="mt-4 email">
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
        <Field className="mt-4 conf_pass">
          <Input name="conf_pass" control={control} type="password"></Input>
          <Label htmlFor="conf_pass">Confirm Password</Label>
        </Field>
        {errors.conf_pass && (
          <p className="text-sm text-red-600">{errors.conf_pass.message}</p>
        )}
        <div className="flex items-center mt-2 have-account gap-x-1">
          <p>Bạn đã có tài khoản đăng nhập tại đây ?</p>
          <Link
            to={"/signInPage"}
            className="font-semibold text-purple-500 whitespace-nowrap"
          >
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
