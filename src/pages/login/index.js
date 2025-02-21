import Login from "@/components/organism/Login";
import AuthLayout from "@/components/templates/AuthLayout";
import React from "react";

const LoginPage = () => {
  return (
    <AuthLayout type="login" title="Login" desc="Login to your account">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
