import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Component/Button/Button";
import IconArrow from "../../Component/Icon/IconArrow";
import Heading from "../../Component/Layout/Heading";
import LoadingSpinner from "../../Component/Loading/LoadingSpinner";
import { db } from "../../firebase-config/firebase-config";
import UserTitle from "../User/UserTitle";
const HomePosterList = () => {
  const [users, setUsers] = useState([]);
  const [numberPost, setNumbrePost] = useState(3);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleLoadMore = () => {
    setLoading(false);
    setTimeout(() => {
      setNumbrePost(() => numberPost + 1);
      setLoading(true);
    }, 500);
  };
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
  const numberUser = users.length;

  return (
    <div className="container lg:px-0 px-1x">
      <Heading className="relative">Poster List</Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2x lg:grid-cols-3 ">
        <div className="grid col-span-1 sm:grid-cols-2 sm:col-span-2">
          <div className="grid col-span-1 sm:grid-cols-2 sm:col-span-2 gap-2x Posts-list">
            {users.length > 0 &&
              users.slice(0, Number(numberPost)).map((user) => {
                return <UserTitle key={user.id} data={user}></UserTitle>;
              })}
          </div>
          {numberUser === numberPost ? (
            <></>
          ) : (
            <Button
              onClick={handleLoadMore}
              className="grid-cols-1 col-span-2 bg-sky-400 text-xl text-white rounded-md p-1x mt-4 w-[300px] font-semibold mx-auto"
            >
              {loading ? " Load More" : <LoadingSpinner></LoadingSpinner>}
            </Button>
          )}
        </div>
        <div className="grid-cols-1 mt-1x lg:mt-0">
          <h2 className="text-xl font-semibold logo">List Category: </h2>
          <ul className="flex flex-col gap-2 p-1 mt-3 max-h-[400px] overflow-auto">
            {categoryList.length > 0 &&
              categoryList.map((item) => {
                if (item.status !== 1) return null;
                return (
                  <li
                    onClick={() => navigate(`/postUser/?id=${item.id}`)}
                    key={item.id}
                    className="flex items-center border-2 border-gray-500 shadow-[2px_2px_0px_1px_#636363] justify-between font-semibold text-[#021b2a] transition-all rounded-md cursor-pointer py-1x group  px-1x"
                    // bg-slate-800
                    // hover:bg-slate-800
                  >
                    <span>{item.name}</span>
                    <span className="mr-5 transition-all group-hover:mr-0 grou">
                      <IconArrow></IconArrow>
                    </span>
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
