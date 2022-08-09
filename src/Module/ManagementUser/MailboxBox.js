import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Field from "../../Component/Field/Field";
import IconCheck from "../../Component/Icon/IconCheck";
import { useAuth } from "../../Contexts/auth-context";
import { db } from "../../firebase-config/firebase-config";
import Managementheading from "../ManagementPage/Managementheading";

const MailboxBox = () => {
  const { userInfo } = useAuth();
  const [change, setChange] = useState(false);
  const [boxNotification, setBoxNotification] = useState([]);
  const handleCheck = async (id) => {
    const colRef = doc(db, "chatUser", id);
    await updateDoc(colRef, {
      watched: true,
    });
    setChange(!change);
  };
  useEffect(() => {
    async function fetchUser() {
      const colRef = query(
        collection(db, "chatUser"),
        where("idUser", "==", userInfo.id)
      );
      const notification = await getDocs(colRef);
      const data = [];
      notification.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setBoxNotification(data);
    }
    fetchUser();
  }, [userInfo.id, change]);

  const handleRole = (role) => {
    switch (role) {
      case 1:
        return <p className="font-semibold text-purple-600">Admin</p>;
      case 2:
        return <p className="font-semibold text-green-600">Mod</p>;
      default:
        break;
    }
  };

  return (
    <div>
      <Managementheading
        title="Your Mailbox"
        desc="Mailbox"
      ></Managementheading>
      <div className="flex flex-col">
        {boxNotification.map((item) => {
          const { sender } = item;
          const formatDate = new Date(
            item.createAt.seconds * 1000
          ).toLocaleString();
          return (
            <div
              key={item.id}
              className="relative inline-block border rounded-md w-max first:mt-0 mt-2x p-1x border-sky-700"
            >
              <div className="flex items-center gap-x-5">
                <div className="flex items-center gap-x-2">
                  <div className="overflow-hidden rounded-full h-4x w-4x">
                    <img src={sender.avatar} alt="" />
                  </div>
                  <div>
                    <span className="font-semibold">Email: {sender.email}</span>
                    <div className="flex items-center gap-x-1">
                      <p>Sender:</p> {handleRole(Number(sender.role))}
                    </div>
                  </div>
                </div>
                <time className="font-medium text-white bg-blue-300 rounded-md p-1x">
                  {formatDate}
                </time>
              </div>
              <div className="flex items-center gap-1 mt-1x">
                <p className="font-semibold ">Content: </p>{" "}
                <p>{item.content}</p>
              </div>
              <button
                onClick={() => handleCheck(item.id)}
                className={`absolute  bg-white rounded-full -right-1x -top-1x ${
                  item.watched ? "text-sky-700" : "text-gray-400"
                }`}
              >
                <IconCheck></IconCheck>
              </button>
            </div>
          );
        })}
        <Field></Field>
      </div>
    </div>
  );
};

export default MailboxBox;
