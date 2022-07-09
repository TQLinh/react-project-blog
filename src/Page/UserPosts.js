import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../Component/Layout/Layout";
import { useToggle } from "../Contexts/toggle-context";
// import { db } from "../firebase-config/firebase-config";
import FavoriteItem from "../Module/favorite/FavoriteItem";

const UserPosts = () => {
  const [params] = useSearchParams();
  const userId = params.get("id");
  const { storedValue } = useToggle();
  console.log("storedValue: ", storedValue);
  const [postUser, setPostUser] = useState([]);
  console.log("postUser: ", postUser);
  useEffect(() => {
    const dataList = [];
    storedValue.forEach((data) => {
      if (data.userId === userId) {
        dataList.push({ ...data });
        setPostUser(dataList);
      }
    });
  }, [storedValue, userId]);

  // useEffect(() => {
  //   async function getData() {
  //     const colRef = collection(db, "posts");
  //     const q = query(colRef, where("userId", "==", userId));
  //     const querySnapshot = await getDocs(q);
  //     const dataList = [];
  //     querySnapshot.forEach((data) => {
  //       dataList.push({ ...data.data() });
  //     });
  //     setPostUser(dataList);
  //   }
  //   getData();
  // }, [userId]);
  return (
    <div>
      <Layout>
        <div className="flex flex-wrap items-center justify-evenly">
          {postUser?.map((item, index) => {
            return <FavoriteItem key={index} data={item}></FavoriteItem>;
          })}
        </div>
      </Layout>
    </div>
  );
};

export default UserPosts;
