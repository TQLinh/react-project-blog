import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ActionDelete from "../../Component/action/ActionDelete";
import ActionEdit from "../../Component/action/ActionEdit";
import ActionView from "../../Component/action/ActionView";
import Button from "../../Component/Button/Button";
import LabelStatus from "../../Component/Label/LabelStatus";
import Table from "../../Component/Table/Table";
import { db } from "../../firebase-config/firebase-config";
import Managementheading from "../ManagementPage/Managementheading";

const CategotyManage = () => {
  const navigate = useNavigate();
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
  const handleDeleteCategory = async (docId) => {
    const colRef = doc(db, "categories", docId);
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
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <Managementheading title="Manage User" desc="Manage your user">
        <Button to="/manage/add-category">Add Category</Button>
      </Managementheading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category, index) => (
              <tr key={category.id}>
                <td>{index}</td>
                <td>{category.name}</td>
                <td>
                  <em className="text-gray-400">{category.slug}</em>
                </td>
                <td>
                  {category.status === 1 && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {category.status === 2 && (
                    <LabelStatus type="danger">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex gap-5 text-gray-400">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategotyManage;
