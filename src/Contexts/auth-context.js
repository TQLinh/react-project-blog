// import { createContext, useContext, useEffect, useState } from "react";
// import useLocalStorage from "../Hooks/useLocalStorage";
// const AuthContext = createContext();

// function AuthProvider(props) {
//   const { storedValue, setValue } = useLocalStorage("user", {});
//   const [user, setUser] = useState(storedValue);

//   useEffect(() => {
//     setValue(user);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user, storedValue]);
//   console.log(storedValue);
//   const value = { user, setUser, setValue, storedValue };
//   return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
// }

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (typeof context === "undefined") throw new Error("Context undefined");
//   return context;
// };

// export { AuthProvider, useAuth };
// import { onAuthStateChanged } from "firebase/auth";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
// import { auth, db } from "../firebase-config/firebase-config";
// import { auth, db } from "../firebase-config/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase-config/firebase-config";
import useLocalStorage from "../Hooks/useLocalStorage";
const AuthContext = createContext();
function AuthProvider(props) {
  const { storedValue, setValue } = useLocalStorage("user", {});
  const [userInfo, setUserInfo] = useState(storedValue);

  useEffect(() => {
    setValue({ ...userInfo });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const handleAddnotification = async (values) => {
    const colRef = collection(db, "boxNotification");
    await addDoc(colRef, {
      ...values,
      createAt: new Date(),
    });
  };
  const value = { userInfo, setUserInfo, setValue, handleAddnotification };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") throw new Error("error");
  return context;
}

export { AuthProvider, useAuth };
