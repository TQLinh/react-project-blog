import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import Heading from "../../Component/Layout/Heading";
import { db } from "../../firebase-config/firebase-config";
import UserTitle from "../User/UserTitle";
const HomePosterList = () => {
  const [users, setUsers] = useState([]);
  // console.log("users: ", users);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapShot) => {
      const userList = [];
      snapShot.forEach((data) => {
        userList.push({ id: data.id, ...data.data() });
      });
      setUsers(userList);
    });
  }, []);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "categories");
    onSnapshot(colRef, (data) => {
      let results = [];
      data.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategoryList(results);
    });
  }, []);
  return (
    <div className="container ">
      <Heading className="relative">Poster List</Heading>
      <div className="grid grid-cols-3 gap-x-2x">
        <div className="grid grid-cols-2 col-span-2 gap-2x Posts-list">
          {users.length > 0 &&
            users.slice(0, 3).map((user) => {
              return <UserTitle key={user.id} data={user}></UserTitle>;
            })}
        </div>
        <div className="grid-cols-1">
          <h2 className="text-xl font-semibold">List Category: </h2>
          <ul className="flex flex-col gap-2 mt-3 max-h-[400px] overflow-auto">
            {categoryList.length > 0 &&
              categoryList.map((item) => {
                console.log("item: ", item);
                return (
                  <li
                    key={item.id}
                    className="font-semibold text-white rounded-md py-1x bg-sky-500 px-1x"
                  >
                    {item.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePosterList;
