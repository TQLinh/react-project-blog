import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ActionDelete from "../../Component/action/ActionDelete";
import ActionEdit from "../../Component/action/ActionEdit";
import LabelStatus from "../../Component/Label/LabelStatus";
import Table from "../../Component/Table/Table";
import { useAuth } from "../../Contexts/auth-context";
import { db } from "../../firebase-config/firebase-config";
import { deleteUser } from "firebase/auth";
const UserTable = () => {
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Personal-post-List-users";
  }, []);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshots) => {
      const results = [];
      snapshots.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setUsers(results);
      // console.log(results);
    });
  }, []);
  // console.log(Users);
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <LabelStatus type="success">active</LabelStatus>;
      case 2:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case 3:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };
  const renderRole = (role) => {
    switch (role) {
      case 1:
        return "Admin";
      case 2:
        return "MOD";
      case 3:
        return "User";
      default:
        break;
    }
  };
  const { setValue, userInfo } = useAuth();

  const handleDeleteUser = (user) => {
    const data = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(data);
        deleteUser(user.id);
        if (userInfo.email === user.email) {
          setValue(null);
        }
        Swal.fire(
          "Deleted!",
          "Your file has been deleted.",
          "Delete user succcessfly!"
        );
      }
      if (userInfo === null) {
        navigate("/signInPage");
      }
    });
  };
  if (userInfo === null) {
    return navigate("/signInPage");
  }
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th className="whitespace-nowrap">Email Address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Users.length > 0 &&
            Users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td className="whitespace-nowrap" title={user.id}>
                    {index}
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="flex items-center gap-x-3">
                      <img
                        className="flex flex-shrink-0 w-10 h-10 rounded-lg"
                        src={
                          user.avatar ||
                          "https://images.unsplash.com/photo-1654267288787-a571aecf0505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80"
                        }
                        alt=""
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{user.fullname}</h3>
                        <time className="text-sm text-gray-400">
                          {new Date(
                            user.createAt.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                          {/* {new Date(user.createAt).toLocaleDateString("vi-VI")} */}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">{user.username}</td>
                  <td title={user.email}>{user.email.slice(0, -10)}</td>
                  <td>{renderStatus(Number(user.status))}</td>
                  <td>{renderRole(Number(user.role))}</td>
                  <td className="flex">
                    {/* <ActionView></ActionView> */}
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/updateUser?id=${user.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(user)}
                    ></ActionDelete>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
