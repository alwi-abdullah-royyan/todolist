"use client";
import React, { useState } from "react";
import { login, register } from "@/services/auth";
import { useRouter } from "next/router";
import InputForm from "@/components/molecules/InputForm";
import Button from "@/components/atoms/Button";

const Register = () => {
  const [failed, setFailed] = useState(false);
  const router = useRouter();
  async function handleRegister(event) {
    event.preventDefault();

    const payload = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    try {
      const res = await register(payload);
      console.log(res);

      if (res.status) {
        setFailed(false);
        router.push("/login");
      } else {
        setFailed(res.error.response.data.data);
      }
    } catch (err) {
      setFailed(err.data);
    }
  }
  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <InputForm label="Username" type="text" name="username" placeholder="Username" isRequired={true} />
      <InputForm label="Email" type="email" name="email" required={true} placeholder="Email" />
      <InputForm type="password" label="Password" name="password" required={true} placeholder="Password" />
      <Button type="submit" text="Register" />
      {failed && <p className="text-red-500 mt-2 text-center">{failed}</p>}
    </form>
  );
};

export default Register;
