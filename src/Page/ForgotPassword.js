import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Field from "../Component/Field/Field";
import Input from "../Component/Input/Input";
import InputPasswordToggle from "../Component/Input/InputPasswordToggle";
import Label from "../Component/Label/Label";
import { db } from "../firebase-config/firebase-config";
import AuthenticationPage from "./AuthenticationPage";
import Button from "../../src/Component/Button/Button";
import * as yup from "yup";
const ForgotPassword = () => {
  useEffect(() => {
    document.title = "PersonalPost-Forgot_password";
  }, []);
  const [cssInput, setCssInput] = useState("");
  const schame = yup.object({
    email: yup
      .string()
      .email("plaese enter valid email")
      .matches(/^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/, {
        message: "Email không hợp lệ",
      })
      .required("please enter your email ..."),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schame),
    mode: "onChange",
  });
  const [emailValue, setEmailValue] = useState("");
  useEffect(() => {
    const showUsers = () => {
      const colRef = collection(db, "users");
      onSnapshot(colRef, (snapshots) => {
        const results = [];
        snapshots.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        results.forEach((item) => {
          if (item.email === emailValue) {
            reset(item);
            setCssInput("text-[#55CEF4] transition-all bg-sky-800 font-bold");
          }
          if (emailValue === "") {
            reset({ password: "" });
            setCssInput();
          }
        });
      });
    };
    showUsers();
  }, [emailValue, reset]);

  return (
    <AuthenticationPage>
      <form autoComplete="off" onSubmit={() => handleSubmit()}>
        <Field>
          <Input
            control={control}
            name="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          ></Input>
          <Label>Enter email to recover password</Label>
        </Field>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
        <Field className="mt-4">
          <InputPasswordToggle
            nameLabel="Your Password "
            disabled
            className={`${cssInput}`}
            control={control}
            name="password"
          ></InputPasswordToggle>
        </Field>
        <Button
          className="relative z-30 flex justify-center w-full mx-auto mt-4 text-center py-1x"
          to="/signInPage"
        >
          Back to Login Page
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default ForgotPassword;
