import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/auth-context";
import { useToggle } from "../../Contexts/toggle-context";
import ImageNotProduct from "../../Images/ImageNotProduct";
import FavoriteItem from "../favorite/FavoriteItem";
import Managementheading from "../ManagementPage/Managementheading";

const ListPostUser = () => {
  const { userInfo } = useAuth();
  const userId = userInfo?.id;
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

  return (
    <div>
      <Managementheading
        title="List Post"
        desc="List of user posts"
      ></Managementheading>
      <div className="flex flex-wrap items-center justify-evenly">
        {postUser.length <= 0 ? (
          <ImageNotProduct></ImageNotProduct>
        ) : (
          postUser?.map((item, index) => {
            return (
              <FavoriteItem updatepost key={index} data={item}></FavoriteItem>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListPostUser;
