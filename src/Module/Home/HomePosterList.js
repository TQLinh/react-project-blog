import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import Heading from "../../Component/Layout/Heading";
import { db } from "../../firebase-config/firebase-config";
import UserTitle from "../User/UserTitle";
const HomePosterList = () => {
  const [users, setUsers] = useState([]);
  const [numberPost, setNumbrePost] = useState(3);
  const navigate = useNavigate();
  const handleLoadMore = () => {
    setNumbrePost(() => numberPost + 1);
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
  console.log("numberUser: ", numberUser);

  return (
    <div className="container ">
      <Heading className="relative">Poster List</Heading>
      <div className="grid grid-cols-3 gap-x-2x">
        <div className="grid grid-cols-2 col-span-2 ">
          <div className="grid grid-cols-2 col-span-2 gap-2x Posts-list">
            {users.length > 0 &&
              users.slice(0, Number(numberPost)).map((user) => {
                return <UserTitle key={user.id} data={user}></UserTitle>;
              })}
          </div>
          {numberUser === numberPost ? (
            <></>
          ) : (
            <button
              onClick={handleLoadMore}
              className="grid-cols-1 col-span-2 bg-sky-400 font-normal text-xl text-white rounded-md p-1x mt-4 w-[300px] mx-auto"
            >
              Load More
            </button>
          )}
        </div>
        <div className="grid-cols-1">
          <h2 className="text-xl font-semibold">List Category: </h2>
          <ul className="flex flex-col gap-2 p-1 mt-3 max-h-[400px] overflow-auto">
            {categoryList.length > 0 &&
              categoryList.map((item) => {
                console.log("item: ", item);
                if (item.status !== 1) return null;
                return (
                  <li
                    onClick={() => navigate(`/postUser/?id=${item.id}`)}
                    key={item.id}
                    className="flex items-center shadow-[2px_2px_0px_1px_#636363] justify-between font-semibold text-[#25d0ff] transition-all rounded-md cursor-pointer py-1x group bg-slate-800 hover:bg-slate-800 px-1x"
                  >
                    <span>{item.name}</span>
                    <span className="mr-5 transition-all group-hover:mr-0 grou">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
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
