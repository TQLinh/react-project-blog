import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout/Layout";
import PostImage from "../Module/Posts/PostImage";
import PostCategory from "../Module/Posts/PostCategory";
import AuthorBox from "../Component/Author/AuthorBox";
import Field from "../Component/Field/Field";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import PostTime from "../Module/Posts/PostTime";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";
import parse from "html-react-parser";
import Comment from "../Module/comment/Comment";
import UpToTop from "../Component/upToTop/UpToTop";
import HomeFooter from "../Module/Home/HomeFooter";
import { useAuth } from "../Contexts/auth-context";
import Swal from "sweetalert2";
import CmtReplies from "../Module/comment/CmtReplies";
Quill.register("modules/imageUploader", ImageUploader);
const PostDetailsPage = () => {
  const [contentPost, setContentPost] = useState();
  const [posts, setPosts] = useState();
  const [comment, setComment] = useState([]);
  const { userInfo } = useAuth();
  const [loadCmt, setLoadCmt] = useState(2);
  const [show, setShow] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  useEffect(() => {
    async function getBlog() {
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapShot) => {
        return snapShot.forEach((doc) => {
          doc?.data() && setContentPost({ ...doc.data(), id: doc.id });
        });
      });
    }
    getBlog();
  }, [slug]);
  useEffect(() => {
    const colRef = query(
      collection(db, "posts"),
      where("categoryid", "==", contentPost?.categoryid || "231212")
    );
    onSnapshot(colRef, (snapshots) => {
      const results = [];
      snapshots.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setPosts(results);
    });
  }, [contentPost?.categoryid]);
  const date = new Date(
    contentPost?.createAt ? contentPost?.createAt?.seconds * 1000 : new Date()
  );
  const formatdate = new Date(date).toLocaleDateString("vi-Vi");

  useEffect(() => {
    const colRef = collection(db, "comment");
    onSnapshot(colRef, (snapshots) => {
      const results = [];
      snapshots.forEach((doc) => {
        if (contentPost?.id === doc.data().idblog) {
          results.push({ id: doc.id, ...doc.data() });
        }
      });
      setComment(results);
    });
  }, [contentPost?.id]);

  const handleDeleteComment = (user) => {
    const data = doc(db, "comment", user.id);
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
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleShow = (id) => {
    const cmt = comment.filter((data) => {
      return data.id === id;
    });
    setShow(cmt);
    // console.log("cmt: ", cmt);
  };
  if (!slug) return;
  return (
    <div>
      <Layout>
        <div className="container pt-2x">
          <div className="">
            <div className="flex p-1 bg-gray-400 header-post gap-x-4 rounded-2xl">
              <PostImage
                url={contentPost?.image}
                className="w-full max-w-[640px] max-h-[450px] h-full rounded-2xl overflow-hidden"
              ></PostImage>
              <div className="w-full pr-2 my-auto post-info">
                <div>
                  <PostCategory>{contentPost?.category.name}</PostCategory>
                  <h1 className="my-2 text-2xl font-bold post-heading">
                    {contentPost?.title}
                  </h1>
                  <PostTime
                    className="px-2 py-1 text-black bg-white rounded-lg "
                    date={formatdate}
                    authorName={contentPost?.user.fullname}
                  ></PostTime>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="w-full grid-cols-3 col-span-3 mb-10 mt-2x post-content">
              <h2 className=" logo">Content:</h2>
              <div className="mt-1x">{parse(contentPost?.content || "")}</div>
            </div>
            <div className="col-span-1 mt-2x">
              <h2 className="logo">Post Liên quan:</h2>
              <div className="">
                {posts?.map((post) => {
                  return (
                    <div
                      onClick={() => navigate(`/${post.slug}`)}
                      key={post.id}
                      className="flex flex-col rounded-md cursor-pointer bg-slate-200 mt-1x p-1x"
                    >
                      <div className="flex items-center justify-between">
                        <div className="rounded-md w-[100px] h-6x">
                          <img src={post.image} alt="" />
                        </div>
                        <PostCategory className="flex items-center h-min">
                          {post.category.name}
                        </PostCategory>
                      </div>
                      <p className="font-semibold">Title: {post.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <div className="container">
        <AuthorBox user={contentPost?.user} className=""></AuthorBox>
        <h3 className="mt-2x">{comment.length} Comment.</h3>
        <Field className="!w-full mt-4">
          <div className="w-full">
            <label className="text-base font-medium">Comment:</label>
            <div className="mt-1">
              <Comment idBlog={contentPost?.id}></Comment>
            </div>
          </div>
        </Field>
      </div>
      <div className="container flex flex-col mt-2">
        {comment.length > 0 &&
          comment.slice(0, loadCmt).map((data) => {
            const { user, createAt } = data;
            const formatDate = new Date(
              createAt.seconds * 1000
            ).toLocaleDateString();
            return (
              <div key={data.id} className="flex items-start w-full mt-2x ">
                <div className="overflow-hidden rounded-full h-4x w-4x">
                  <img src={user.avatar} alt="" />
                </div>
                <div className="max-w-[800px] w-full ml-2x ">
                  <div className="flex flex-col flex-1 bg-gray-200 border border-gray-400 rounded-lg p-1x">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="flex items-center gap-3 py-1 bg-white border-b-2 border-l-2 border-gray-500 rounded-lg px-1x">
                        <p> {user.fullname}</p>
                        {user.id === contentPost.user.id && (
                          <p className="text-sm text-sky-500">-(Author)</p>
                        )}
                        {Number(user.role) === 1 && (
                          <p className="text-sm text-green-500">-(Admin)</p>
                        )}
                      </span>
                      <time className="text-sm font-medium text-gray-700">
                        {formatDate}
                      </time>
                    </div>
                    <p className="w-full whitespace-normal mt-1x">
                      {data.comment}
                    </p>
                  </div>
                  <div className="flex items-center text-sm ml-1x text-sky-500">
                    <span className="transition-all hover:underline">Like</span>
                    <div className="w-[3px] h-[3px] mt-1 mx-1 overflow-hidden rounded-full bg-blue-300"></div>
                    <span
                      onClick={() => handleShow(data.id)}
                      className="transition-all hover:underline"
                    >
                      Trả lời
                    </span>
                  </div>
                  {show && <CmtReplies setShow={setShow}></CmtReplies>}
                </div>
                {Number(userInfo.role) === 1 && (
                  <div
                    onClick={() => handleDeleteComment(data)}
                    className="font-semibold text-white rounded-full cursor-pointer bg-gradient-to-tr from-blue-900 to-slate-900 ml-1x py-1x px-2x"
                  >
                    Delete Comment
                  </div>
                )}
              </div>
            );
          })}
        {comment.length <= 2 || comment.length === loadCmt ? (
          ""
        ) : (
          <div
            className="font-semibold cursor-pointer logo p-2x"
            onClick={() => setLoadCmt(loadCmt + 1)}
          >
            {`  Load more ${comment.length - loadCmt} comment...`}
          </div>
        )}
      </div>
      <HomeFooter></HomeFooter>
      <UpToTop></UpToTop>
    </div>
  );
};

export default PostDetailsPage;
