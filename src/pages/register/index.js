"use client";
import React, { useEffect } from "react";
import AuthLayout from "@/components/templates/AuthLayout";
import Register from "@/components/organism/Register";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/services/auth";

const RegisterPage = () => {
  const router = useRouter();

  return (
    <AuthLayout type="register" title="Register" desc="Create your account">
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;
