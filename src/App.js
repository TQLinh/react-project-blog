import { Route, Routes } from "react-router-dom";
import React from "react";
import RegisterPage from "./Page/RegisterPage";
import SignInPage from "./Page/SignInPage";
import HomePage from "./Page/HomePage";
import { AuthProvider } from "./Contexts/auth-context";
import IntroducePage from "./Page/IntroducePage";
import ContentHome from "./Page/ContentHome";
import NotFoundPage from "./Page/NotFoundPage";
import ManagementLayout from "./Module/ManagementPage/ManagementLayout";
import UserManage from "./Module/User/UserManage";
import UserAddNew from "./Module/User/UserAddNew";
import UserUpdate from "./Module/User/UserUpdate";
import PostDetailsPage from "./Page/PostDetailsPage";
import PostManage from "./Module/Posts/PostManage";
import PostAddNew from "./Module/Posts/PostAddNew";
import CategotyManage from "./Module/Categorys/CategotyManage";
import CategoryAddNew from "./Module/Categorys/CategoryAddNew";
import CategoryUpdate from "./Module/Categorys/CategoryUpdate";
import PostUpdate from "./Module/Posts/PostUpdate";
import { ToggleProvider } from "./Contexts/toggle-context";
import FavoriteList from "./Page/FavoriteList";
import UserPosts from "./Page/UserPosts";
import ListPosts from "./Page/ListPosts";
import AccountManagement from "./Module/ManagementUser/AccountManagement";
import Account from "./Module/ManagementUser/Account";
import UserUpdatePost from "./Module/ManagementUser/UserUpdatePost";
import UserCreatePost from "./Module/ManagementUser/UserCreatePost";
import UpdateAccount from "./Module/ManagementUser/UpdateAccount";
import UserCreateCategory from "./Module/ManagementUser/UserCreateCategory";
import ListPostUser from "./Module/ManagementUser/ListPostUser";
import MessageAdmin from "./Module/ManagementUser/MessageAdmin";
import MessageBox from "./Module/MessageBox/MessageBox";
import ForgotPassword from "./Page/ForgotPassword";
function App() {
  return (
    <div>
      <AuthProvider>
        <ToggleProvider>
          <Routes>
            <Route element={<HomePage></HomePage>}>
              <Route path="/" element={<ContentHome></ContentHome>}></Route>
              <Route
                path="/Introduce"
                element={<IntroducePage></IntroducePage>}
              ></Route>
              <Route path="/favorite_list" element={<FavoriteList />}></Route>
              <Route
                path="/listposts"
                element={<ListPosts></ListPosts>}
              ></Route>
            </Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route
              path="/registerPage"
              element={<RegisterPage></RegisterPage>}
            ></Route>
            <Route
              path="/signInPage"
              element={<SignInPage></SignInPage>}
            ></Route>
            <Route
              path="/forgot-password"
              element={<ForgotPassword></ForgotPassword>}
            ></Route>
            <Route path="/postUser" element={<UserPosts></UserPosts>}></Route>

            <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
            {/* <Route path="/:slug" element=""></Route> */}
            <Route element={<AccountManagement></AccountManagement>}>
              <Route
                path="/AccountManagement/user"
                element={<Account></Account>}
              ></Route>
              <Route
                path="/AccountManagement/updateAccount"
                element={<UpdateAccount></UpdateAccount>}
              ></Route>
              <Route
                path="/AccountManagement/createpost"
                element={<UserCreatePost></UserCreatePost>}
              ></Route>
              <Route
                path="/AccountManagement/create-category"
                element={<UserCreateCategory></UserCreateCategory>}
              ></Route>
              <Route
                path="/AccountManagement/post-list"
                element={<ListPostUser></ListPostUser>}
              ></Route>
              <Route
                path="/AccountManagement/update-post"
                element={<UserUpdatePost></UserUpdatePost>}
              ></Route>
              <Route
                path="/AccountManagement/message"
                element={<MessageAdmin></MessageAdmin>}
              ></Route>
            </Route>
            <Route element={<ManagementLayout></ManagementLayout>}>
              <Route
                path="/manage/message-box"
                element={<MessageBox></MessageBox>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/updateUser"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/manage/post"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategotyManage></CategotyManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
            </Route>
          </Routes>
        </ToggleProvider>
      </AuthProvider>
      {/* <img
          className="w-10 h-10 rounded-full"
          src="https://i.pinimg.com/originals/00/de/24/00de2407a0f7e716e4a85286bc3ee9f6.gif"
          alt=""
        /> */}
    </div>
  );
}

export default App;
