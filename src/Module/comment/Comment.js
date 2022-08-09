import React from "react";
// import parse from "html-react-parser";
import { useController, useForm } from "react-hook-form";
import { useAuth } from "../../Contexts/auth-context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config";
const Comment = ({ idBlog }) => {
  const { userInfo } = useAuth();
  const { avatar, email, fullname, id, role } = userInfo;
  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    defaultValues: { comment: "" },
  });
  const log = async (values) => {
    await addDoc(collection(db, "comment"), {
      ...values,
      idblog: idBlog,
      createAt: new Date(),
      feedback: {},
      user: { avatar, email, fullname, id, role },
    });
    reset({ comment: "" });
  };

  return (
    <div className="max-w-[700px]">
      <form autoComplete="off" onSubmit={handleSubmit(log)}>
        <div className="flex items-center border border-gray-300 rounded-md group p-1x">
          <div className="overflow-hidden rounded-full w-4x h-4x">
            <img className="" src={avatar} alt="" />
          </div>
          <InputCmt control={control} name="comment" className=""></InputCmt>
        </div>
        <div className="flex justify-end gap-5 fun_cmt mt-1x">
          <div
            onClick={() => reset({ comment: "" })}
            className="relative flex py-2 text-xl font-bold text-blue-200 rounded-full cursor-pointer px-2x bg-gradient-to-t from-blue-900 to-slate-900"
          >
            Hủy
          </div>
          <button className="relative flex p-2 text-xl font-bold text-blue-200 rounded-full px-2x bg-gradient-to-t from-blue-900 to-slate-900">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

const InputCmt = ({ control, name = "content", className, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <input
      {...field}
      {...rest}
      id="name"
      placeholder="Enter your comment..."
      className={` w-full text-[18px] input-cmt font-semibold flex-1 border-b-2 ml-1x text-gray-400 border-gray-400  max-h-[100px] p-1 ${className}`}
    ></input>
  );
};
export default Comment;
