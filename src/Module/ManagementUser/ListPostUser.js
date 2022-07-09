import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/auth-context";
import { useToggle } from "../../Contexts/toggle-context";
import FavoriteItem from "../favorite/FavoriteItem";

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
      <div className="flex flex-wrap items-center justify-evenly">
        {postUser?.map((item, index) => {
          return (
            <FavoriteItem updatepost key={index} data={item}></FavoriteItem>
          );
        })}
      </div>
    </div>
  );
};

export default ListPostUser;
