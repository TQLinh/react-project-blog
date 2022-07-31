import React, { useState } from "react";
import { useEffect } from "react";
import BallsLoading from "../Component/Loading/BallsLoading";
import { useToggle } from "../Contexts/toggle-context";
import ImageNotProduct from "../Images/ImageNotProduct";
import FavoriteItem from "../Module/favorite/FavoriteItem";

const FavoriteList = () => {
  const { storedValue: listFavorite } = useToggle();
  const [Favorite, setFavorite] = useState([]);
  console.log("Favorite: ", Favorite);
  useEffect(() => {
    const data = [];
    listFavorite.forEach((item) => {
      if (item.favourite === true) {
        data.push({ ...item });
      }
      setFavorite(data);
    });
  }, [listFavorite]);
  {
    // <BallsLoading></BallsLoading>
  }
  return (
    <>
      {Favorite.length <= 0 ? (
        <ImageNotProduct></ImageNotProduct>
      ) : (
        <div className="flex flex-wrap items-center justify-evenly">
          {Favorite?.map((item) => {
            return <FavoriteItem key={item.id} data={item}></FavoriteItem>;
          })}
        </div>
      )}
    </>
  );
};

export default FavoriteList;
