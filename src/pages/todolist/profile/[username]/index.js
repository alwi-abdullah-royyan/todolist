import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser, getToken } from "@/services/auth";
import AuthLayout from "@/components/templates/AuthLayout";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import UserUpdateProfile from "@/components/organism/UserUpdateProfile";

const ProfilePage = () => {
  return (
    <>
      <AuthLayout type="" title="Update Profile" desc="Update your profile">
        <UserUpdateProfile />
      </AuthLayout>
    </>
  );
};

export default ProfilePage;
