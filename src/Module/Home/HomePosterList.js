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
  return (
    <div className="container ">
      <Heading className="relative">Poster List</Heading>
      <div className="flex justify-between gap-2 Posts-list">
        {users.length > 0 &&
          users.slice(0, 3).map((user) => {
            return <UserTitle key={user.id} data={user}></UserTitle>;
          })}
      </div>
    </div>
  );
};

export default HomePosterList;
