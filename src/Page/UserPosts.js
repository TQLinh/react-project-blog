import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../Component/Layout/Layout";
import { useToggle } from "../Contexts/toggle-context";
import ImageNotProduct from "../Images/ImageNotProduct";
import FavoriteItem from "../Module/favorite/FavoriteItem";

const UserPosts = () => {
  const [params] = useSearchParams();
  const userId = params.get("id");
  const { storedValue } = useToggle();
  // console.log("storedValue: ", storedValue);
  const [postUser, setPostUser] = useState([]);
  // console.log("postUser: ", postUser);
  useEffect(() => {
    const dataList = [];
    storedValue.forEach((data) => {
      if (data.userId === userId || data.category.id === userId) {
        dataList.push({ ...data });
        setPostUser(dataList);
      }
    });
  }, [storedValue, userId]);
  return (
    <div>
      <Layout>
        <div className="flex flex-wrap items-center justify-evenly">
          {postUser.length <= 0 ? (
            <ImageNotProduct></ImageNotProduct>
          ) : (
            postUser?.map((item, index) => {
              return <FavoriteItem key={index} data={item}></FavoriteItem>;
            })
          )}
        </div>
      </Layout>
    </div>
  );
};

export default UserPosts;
