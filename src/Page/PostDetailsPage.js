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
import { Slider } from "infinite-react-carousel/lib";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";
import parse from "html-react-parser";
import Comment from "../Module/comment/Comment";
import UpToTop from "../Component/upToTop/UpToTop";
import HomeFooter from "../Module/Home/HomeFooter";
Quill.register("modules/imageUploader", ImageUploader);
const PostDetailsPage = () => {
  // const [content, setContent] = useState("");
  const [contentPost, setContentPost] = useState();
  // console.log("contentPost: ", contentPost);
  const { slug } = useParams();
  // console.log("slug: ", slug);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  useEffect(() => {
    async function getBlog() {
      // if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapShot) => {
        return snapShot.forEach((doc) => {
          doc?.data() && setContentPost(doc.data());
        });
      });
    }
    getBlog();
  }, [slug]);

  const settings = {
    dots: false,
    slidesToShow: 2,
    centerMode: true,
    centerPadding: 0,
    autoplaySpeed: 1000,
    slidesPerRow: 1,
    // shift: 0,
    appendDots: (dots) => {
      console.log(dots[1]);
      return <ul style={{ display: "flex" }}>{dots}</ul>;
    },
    // accessibility: true,
    dotsClass: "p-3 rounded-full shadow-sm",
    nextArrow: <ion-icon name="chevron-forward-sharp" id="icon"></ion-icon>,
    prevArrow: <ion-icon name="chevron-back-sharp" id="icon"></ion-icon>,
  };

  const date = new Date(
    contentPost?.createAt ? contentPost?.createAt?.seconds * 1000 : new Date()
  );
  const formatdate = new Date(date).toLocaleDateString("vi-Vi");
  // console.log("formatdate: ", formatdate);
  if (!slug) return;
  return (
    <div>
      <Layout>
        <div className="container py-3">
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
              <div className="w-full mt-2">
                <h2 className="text-base font-semibold">Bài viết liên quan:</h2>
                <Slider {...settings} className="w-full">
                  <div className="w-full max-h-[170px] h-full overflow-hidden rounded-md">
                    <img
                      className="image"
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      alt=""
                    />
                  </div>
                  <div className="w-full max-h-[170px] h-full overflow-hidden rounded-md">
                    <img
                      className="image"
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      alt=""
                    />
                  </div>
                  <div className="w-full max-h-[170px] h-full overflow-hidden rounded-md">
                    <img
                      className="image"
                      src="https://images.unsplash.com/photo-1601513627407-e12f53e1f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      alt=""
                    />
                  </div>
                  <div className="w-full max-h-[170px] h-full overflow-hidden rounded-md">
                    <img
                      className="image"
                      src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                      alt=""
                    />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
          <div className="my-10 max-w-[900px] mx-auto w-full post-content">
            <div>{parse(contentPost?.content || "")}</div>
          </div>
          <AuthorBox user={contentPost?.user} className=""></AuthorBox>
          <Field className="!w-full mt-4">
            <div className="w-full">
              <label className="text-base font-medium">Comment:</label>
              <div className="mt-1">
                <Comment></Comment>
              </div>
            </div>
          </Field>
        </div>
      </Layout>
      <HomeFooter></HomeFooter>
      <UpToTop></UpToTop>
    </div>
  );
};

export default PostDetailsPage;
