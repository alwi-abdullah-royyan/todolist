import Register from "@/components/organism/Register";
import AuthLayout from "@/components/templates/AuthLayout";
import React from "react";

const AddUser = () => {
  return (
    <AuthLayout type="" title="Create user" desc="Create user">
      <Register path="/todolist/dashboard/users" />
    </AuthLayout>
  );
};

export default AddUser;
