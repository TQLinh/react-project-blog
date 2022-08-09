import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ActionDelete from "../../Component/action/ActionDelete";
import { db } from "../../firebase-config/firebase-config";
import Managementheading from "../ManagementPage/Managementheading";
import parse from "html-react-parser";
import Swal from "sweetalert2";
const MessageBox = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "chat");
    onSnapshot(colRef, (snapshots) => {
      const results = [];
      snapshots.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setMessages(results);
      // console.log(results);
    });
  }, []);
  const handleDelete = (id) => {
    const docRef = doc(db, "chat", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <Managementheading
        title="Message box"
        desc="Messages from users"
      ></Managementheading>
      <div className="flex flex-col gap-3">
        {messages.length > 0 &&
          messages.map((data) => {
            const { id, sender, title, content, createAt } = data;
            const formatDate = new Date(createAt.seconds * 1000).toLocaleString(
              "vi-VI"
            );
            return (
              <div
                key={id}
                className="p-2 rounded-xl border-b-2 bg-gradient-to-tr from-[#116dbd] to-[#10295f]"
              >
                <div className="flex items-center justify-between py-1 border-b-2 border-l-2 rounded-md px-1x border-sky-200 ">
                  <div className="flex items-center gap-x-3 ">
                    <div className="overflow-hidden rounded-full h-4x w-4x shadow-[0px_0px_10px_2px_white]">
                      <img className="h-full" alt="" src={sender.avatar} />
                    </div>
                    <div>
                      <span className="text-[18px]  text-white font-semibold">
                        {sender.fullname}
                      </span>
                      <p className="text-xs font-semibold text-white underline">
                        {sender.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 font-semibold text-white">
                    <span>{formatDate}</span>
                    <ActionDelete
                      onClick={() => handleDelete(id)}
                    ></ActionDelete>
                  </div>
                </div>
                <div className="mt-1 overflow-hidden rounded-xl">
                  <h3 className="text-xl  font-semibold underline text-[#ffffff]">
                    Title: {title}
                  </h3>
                  <div className="h-[100px] mt-2 overflow-auto p-1 bg-white">
                    {parse(content)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MessageBox;
