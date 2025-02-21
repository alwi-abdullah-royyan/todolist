import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputForm";
import { login } from "@/services/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const [failed, setFailed] = useState(false);
  const router = useRouter();
  async function handleLogin(event) {
    event.preventDefault();

    const payload = {
      username: event.target.username.value, //johnd
      password: event.target.password.value, //m38rmF$
    };
    try {
      const res = await login(payload);
      console.log(res);

      if (res.status) {
        localStorage.setItem("token", res.token);
        setFailed(false);
        router.push("/todolist");
      } else {
        setFailed(res.error.response.data.data);
      }
    } catch (err) {
      setFailed(err.data);
    }
  }
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <InputForm label="Username" type="text" name="username" placeholder="Username" isRequired={true} />
      <InputForm type="password" label="Password" name="password" isRequired={true} placeholder="Password" />
      <Button type="submit" text="Login" />
      {failed && <p className="text-red-500 mt-2 text-center">{failed}</p>}
    </form>
  );
};

export default Login;
