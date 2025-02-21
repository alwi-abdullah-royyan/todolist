import React from "react";
import Link from "next/link";

const AuthLayout = ({ children, title, desc, type = "login" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="max-w-sm w-full p-6 bg-gray-900 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-white mb-2">{title}</h2>
        <p className="font-medium text-slate-500 mb-4 text-center">{desc}</p>

        <div className="space-y-4">{children}</div>

        {type && (
          <p className="text-sm text-center mt-4">
            {type === "register" ? "Already have an account? " : "Don't have an account? "}
            <Link className="text-blue-500 hover:text-blue-700" href={type === "register" ? "/login" : "/register"}>
              {type === "register" ? "Login" : "Register"}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
