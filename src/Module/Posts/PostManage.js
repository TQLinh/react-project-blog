import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ActionDelete from "../../Component/action/ActionDelete";
import ActionEdit from "../../Component/action/ActionEdit";
import ActionView from "../../Component/action/ActionView";
import Button from "../../Component/Button/Button";
import LabelStatus from "../../Component/Label/LabelStatus";
import Table from "../../Component/Table/Table";
import { useToggle } from "../../Contexts/toggle-context";
import { db } from "../../firebase-config/firebase-config";
import Managementheading from "../ManagementPage/Managementheading";
import ReactPaginate from "react-paginate";
const PostManage = () => {
  const [posts, setPosts] = useState([]);
  const { setValue } = useToggle();
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshots) => {
      const results = [];
      snapshots.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setPosts(results);
      setValue(results);
      // console.log(results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeletePost = (id) => {
    const docRef = doc(db, "posts", id);
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
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case 2:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case 3:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };
  // -----------------------------
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const handlePageClick = (event) => {
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(event);
    // setItemOffset(newOffset);
  };
  return (
    <div>
      <Managementheading title="Manage Post" desc="Manage your post">
        <Button to="/manage/add-post">Add Post</Button>
      </Managementheading>

      <Table>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 &&
            posts.map((data, index) => {
              const number = index + 1;
              const date = new Date(
                data.createAt.seconds * 1000
              ).toLocaleDateString("vn-vi");
              return (
                <tr key={data.id}>
                  <td title={data.id}>{number}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <img
                        className="w-[70px] h-[55px] rounded-sm"
                        src={data.image}
                        alt=""
                      />
                      <div className="flex-1">
                        <h3
                          title={data.title}
                          className="font-semibold max-w-[200px] whitespace-nowrap overflow-ellipsis overflow-hidden"
                        >
                          {data.title}
                        </h3>
                        <time className="text-sm text-gray-400">{date}</time>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-base text-gray-900">
                      {data.category.name}
                    </span>
                  </td>
                  <td>
                    <span className="text-base text-gray-900">
                      {data.user.fullname}
                    </span>
                  </td>
                  <td>
                    <span className="text-base text-gray-900">
                      {renderStatus(Number(data.status))}
                    </span>
                  </td>
                  <td className="flex gap-x-1">
                    <ActionView
                      onClick={() => navigate(`/${data.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-post?id=${data.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeletePost(data.id)}
                    ></ActionDelete>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={18}
          marginPagesDisplayed={2}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName={
            "flex items-center justify-center mt-2x mx-auto gap-x-1x"
          }
          pageClassName={"bg-gray-300  rounded-sm  shadow-sm "}
          pageLinkClassName={"p-1 w-4x h-4x flex justify-center items-center "}
          activeClassName={"bg-sky-400"}
          nextClassName={"bg-sky-400 rounded-lg"}
          nextLinkClassName={"p-2 flex-1 flex text-white font-semibold "}
          previousClassName={"bg-sky-400 rounded-lg"}
          previousLinkClassName={"p-2 flex-1 flex text-white font-semibold "}
        />
      </div>
      <div className="h-3x"></div>
    </div>
  );
};

export default PostManage;
