import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config/firebase-config";
import FavoriteItem from "../Module/favorite/FavoriteItem";

const ListPosts = () => {
  const [data, setData] = useState([]);
  // console.log("data: ", data);
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const dataList = [];
      onSnapshot(colRef, (docs) => {
        docs.forEach((doc) => {
          dataList.push({ id: doc.id, ...doc.data() });
        });
        setData(dataList);
      });
    }
    fetchData();
  }, []);
  return (
    <div className="container flex flex-wrap justify-evenly">
      {data?.length > 0 &&
        data.map((item) => {
          if (Number(item.status) === 2) return null;
          return <FavoriteItem key={item.id} data={item}></FavoriteItem>;
        })}
    </div>
  );
};

export default ListPosts;
