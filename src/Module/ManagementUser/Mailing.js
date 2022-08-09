import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import Field from "../../Component/Field/Field";
import { toast } from "react-toastify";
import Label from "../../Component/Label/Label";
import { useAuth } from "../../Contexts/auth-context";
import { db } from "../../firebase-config/firebase-config";
import Managementheading from "../ManagementPage/Managementheading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "../../Component/Input/Textarea";
import LoadingSpinner from "../../Component/Loading/LoadingSpinner";
const Mailing = () => {
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState("");
  const { userInfo } = useAuth();
  const { email, avatar, fullname, role } = userInfo;
  const schame = yup.object({
    content: yup.string().required("please enter your username ..."),
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schame),
    defaultValues: {
      idUser: "",
      content: "",
      createAt: new Date(),
    },
  });
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshots) => {
      const results = [];
      snapshots.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setUsers(results);
    });
  }, []);
  const handleSendUser = async (values) => {
    const colRef = collection(db, "chatUser");
    try {
      await addDoc(colRef, {
        ...values,
        sender: { email, avatar, fullname, role },
        idUser: selectUser.id,
        watched: false,
      });
      toast.success("Send to user successflly");
      reset({
        idUser: "",
        content: "",
        createAt: new Date(),
        watched: false,
      });
      setSelectUser("");
    } catch (error) {
      toast.error("Send to user errors");
    }
  };
  return (
    <div>
      <Managementheading
        title="Manage Mailing"
        desc="Mailing to user"
      ></Managementheading>
      <div className="relative grid grid-cols-4 gap-1x">
        <form
          onSubmit={handleSubmit(handleSendUser)}
          autoComplete="off"
          className="col-span-3 "
        >
          <Field>
            <input
              disabled
              type="text"
              name="idUser"
              defaultValue={selectUser.email}
              className="block w-full px-4 py-[15px] transition-all bg-white border-2 border-gray-300 rounded-lg input"
            ></input>
            <Label>Select email</Label>
          </Field>
          <Field className="flex flex-col mt-2x">
            <label htmlFor="content" className="text-xl font-semibold">
              Nội dung:
            </label>
            <Textarea
              placeholder="Enter content live here"
              name="content"
              id="content"
              control={control}
              cols="30"
              rows="10"
            ></Textarea>
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content.message}</p>
            )}
          </Field>
          <Button type="submit" className="w-max max-w-[250px]">
            {isSubmitting ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              `  Send to (${selectUser.fullname || "name..."})`
            )}
          </Button>
        </form>
        <div className="col-span-1">
          <h3 className="logo">Select users:</h3>
          <ul className="">
            {users.map((user) => {
              if (userInfo.id === user.id) return null;
              return (
                <li
                  onClick={() => setSelectUser(user)}
                  key={user.id}
                  className="flex items-center p-1 mt-2 border border-gray-400 rounded-lg gap-x-2"
                >
                  <div className="overflow-hidden rounded-full h-4x w-4x">
                    <img src={user.avatar} alt="" className="" />
                  </div>
                  <span>
                    <p className="font-semibold">{user.email}</p>
                    <p className="text-xs font-bold">{user.fullname}</p>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mailing;
