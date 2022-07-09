import React, { useEffect } from "react";
import Button from "../../Component/Button/Button";
import Managementheading from "../ManagementPage/Managementheading";
import UserTable from "./UserTable";

const UserManage = () => {
  useEffect(() => {
    document.title = "Perspnal-post-Manage-user";
  }, []);
  return (
    <div>
      <Managementheading title="Manage User" desc="Manage your user">
        <Button
          type="button"
          className="max-w-[200px] flex justify-end"
          to={"/manage/add-user"}
        >
          Add user
        </Button>
      </Managementheading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
