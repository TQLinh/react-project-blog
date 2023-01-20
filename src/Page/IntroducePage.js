import React from "react";

const IntroducePage = () => {
  return (
    <div className="container !mt-2x">
      <div className="rule-posts">
        <h1 className="logo">Quy tắc đăng bài: </h1>
        <div>
          <ul className="!list-inside list-disc ml-1x">
            <li>Không được viết những bài đăng xúc phạm người khác.</li>
            <li className="">
              Tài khoản phải trong trạng thái ( active ) mới có thể đăng bài;
            </li>
            <li>Không được comment những từ ngữ khiếm nhã.</li>
            <li>Không viết những bài liên quan đến những vấn để nhạy cảm.</li>
            <li className="font-semibold">
              Nếu vi phạm các quy tắc trên có thể sẽ bị khóa tài khoản.
            </li>
          </ul>
        </div>
      </div>
      <div className="rule-posts">
        <h1 className="logo">Hướng dẫn sử dụng các chức năng của trang web:</h1>
        <div>
          <ul className="!list-inside list-disc ml-1x">
            <li className="">
              <div className="flex items-center justify-between">
                <p>
                  Bấm vào biểu tượng avatar và bấm vào manage user để đi đến
                  trang quản lý ={">"}
                </p>
                <div className="w-[200px]">
                  <img srcSet="box-img/imgManage.png" alt="lỗi" />
                </div>
              </div>
            </li>
            <li className="">
              <div className="flex items-center justify-between">
                <p>Biểu tượng hình chuông thông báo tin tức từ admin ={">"}</p>
                <div className="w-[100px]">
                  <img srcSet="box-img/imgMessageBell.png" alt="lỗi" />
                </div>
              </div>
            </li>
            <li>
              {" "}
              <div className="">
                <p>Trang thông tin user ={">"}</p>
                <div className="w-[600px]">
                  <img srcSet="box-img/imgUserInfomation.png" alt="lỗi" />
                </div>
              </div>
            </li>
            <li>
              Trang update user người dùng ko có quyền sửa email status and role
            </li>
            <li>Nếu vi phạm các quy tắc trên có thể sẽ bị khóa tài khoản.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntroducePage;
