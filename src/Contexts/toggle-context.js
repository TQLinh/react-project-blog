import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase-config/firebase-config";
import useLocalStorage from "../Hooks/useLocalStorage";

const ToggleContext = createContext();

function ToggleProvider(props) {
  // const [postList, setPostList] = useState([]);
  // console.log("postList: ", postList);
  const { storedValue, setValue } = useLocalStorage("photos", []);
  // console.log("storedValue: ", storedValue);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const dataList = [];
      onSnapshot(colRef, (docs) => {
        docs.forEach((doc) => {
          dataList.push({ id: doc.id, ...doc.data() });
        });
        setValue(dataList);
        // setValue(dataList);
      });
    }
    fetchData();
  }, []);
  const toggleFavourite = (photoId) => {
    const updateFavourite = storedValue.map((photo) => {
      if (photo.id === photoId) {
        return { ...photo, favourite: !photo.favourite };
      }
      return photo;
    });
    setValue(updateFavourite);
  };
  const value = {
    storedValue,
    setValue,
    toggleFavourite,
  };
  return (
    <ToggleContext.Provider value={value} {...props}></ToggleContext.Provider>
  );
}

function useToggle() {
  const context = useContext(ToggleContext);

  if (typeof context === "undefined") throw new Error("lỗi");
  return context;
}
export { ToggleProvider, useToggle };
