import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import Field from "../../Component/Field/Field";
import Input from "../../Component/Input/Input";
import Label from "../../Component/Label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldCheckboxes from "../../Component/Field/FieldCheckboxes";
import Radio from "../../Component/checkbox/Radio";
import HomeFooter from "../Home/HomeFooter";
import { Editor } from "@tinymce/tinymce-react";
import { useAuth } from "../../Contexts/auth-context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config";
import { toast } from "react-toastify";
import Managementheading from "../ManagementPage/Managementheading";
const MessageAdmin = () => {
  const { userInfo } = useAuth();
  const { id, email, fullname, avatar } = userInfo;
  const schame = yup.object({
    title: yup.string().required("Plese enter your category title "),
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
      title: "",
      sender: {},
      MessageType: 1,
      createAt: new Date(),
    },
  });
  const editorRef = useRef(null);
  const log = async (values) => {
    if (editorRef.current) {
      console.log("editorRef: ", editorRef.current.getContent());
      try {
        const colRef = collection(db, "chat");
        await addDoc(colRef, {
          ...values,
          sender: { email, id, fullname, avatar },
          content: editorRef.current.getContent(),
        });
        toast.success("Send message successfly");
        reset({
          title: "",
          sender: { email, id, fullname, avatar },
          MessageType: 1,
          content: "",
          createAt: new Date(),
        });
      } catch (error) {
        console.log(error);
        toast.error("Send message error");
      }
    }
  };
  const watchStatus = watch("MessageType");
  return (
    <div>
      <Managementheading
        title="Notification message"
        desc="notification message to admin"
      ></Managementheading>
      <form autoComplete="off" onSubmit={handleSubmit(log)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <FieldCheckboxes>
            <label className="text-base font-semibold">Message Type:</label>
            <div className="flex flex-warp gap-x-5">
              <Radio
                name="MessageType"
                control={control}
                checked={Number(watchStatus) === 1}
                value={1}
              >
                System error report
              </Radio>
              <Radio
                name="MessageType"
                checked={Number(watchStatus) === 2}
                control={control}
                value={2}
              >
                Feedback
              </Radio>
              <Radio
                name="MessageType"
                checked={Number(watchStatus) === 3}
                control={control}
                value={3}
              >
                Other
              </Radio>
            </div>
          </FieldCheckboxes>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <div>
            <Field>
              <Input control={control} name="title" type="text"></Input>
              <Label>Title</Label>
            </Field>
            {errors.title && (
              <p className="text-sm text-red-600"> {errors?.title.message}</p>
            )}
          </div>
          <div>
            <Field>
              <Input
                control={control}
                name=""
                disabled
                type="email"
                value={email}
              ></Input>
              <Label>Email</Label>
            </Field>
          </div>
        </div>
        <div className="mb-10 gap-x-10">
          <label className="text-base font-semibold">Content:</label>
          <Editor
            textareaName="content"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              selector: "textarea",
              height: 300,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
                "emoticons",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter" +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat image emoticons | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <Button type="submit" className="mx-auto max-w-[250px]">
          Add category
        </Button>
      </form>
      <HomeFooter></HomeFooter>
    </div>
  );
};

export default MessageAdmin;
