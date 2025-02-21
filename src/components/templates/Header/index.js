import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icons from "@/components/atoms/Icons";
import { getCurrentUser, isAdminUser, isAuthenticated } from "@/services/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(""); // State to store username
  const [authStatus, setAuthStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setAuthStatus(isAuthenticated());
    setIsAdmin(isAdminUser());
    if (authStatus) {
      const currentUsername = getCurrentUser();
      setUsername(currentUsername); // Store username in state
    }
  }, [authStatus]);

  return (
    <header className="bg-gray-900 text-gray-200 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold text-blue-500">
          ToDoList
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition-colors">
            Home
          </Link>
          {isAdmin && (
            <Link
              href="/todolist/dashboard"
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-500 transition-colors"
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/todolist/category"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-500 transition-colors"
          >
            Category
          </Link>
          <Link
            href="/todolist/trash"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-500 transition-colors"
          >
            Trash
          </Link>
        </nav>

        {/* Call to Action Button (Desktop) */}
        {authStatus && username ? (
          <Link
            href={`/todolist/profile/${username}`}
            className="hidden md:block hover:bg-blue-800 transition-colors text-white px-4 py-2 rounded-md"
          >
            Profile
          </Link>
        ) : (
          <Link
            href="/login"
            className="hidden md:block hover:bg-blue-800 transition-colors text-white px-4 py-2 rounded-md"
          >
            <div className="flex">
              <Icons.Login /> Login
            </div>
          </Link>
        )}

        {/* Mobile Menu Icon */}
        <button onClick={toggleMenu} className="md:hidden text-gray-200 hover:text-blue-500 focus:outline-none">
          <Icons.Hamburger />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition-colors">
              Home
            </Link>
            {isAdmin && (
              <Link
                href="/todolist/dashboard"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500 transition-colors"
              >
                Dashboard
              </Link>
            )}
            <Link
              href={`/todolist/category/${username}`}
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-500 transition-colors"
            >
              Category
            </Link>
            <Link
              href="/todolist/trash"
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-500 transition-colors"
            >
              Trash
            </Link>

            {authStatus && username ? (
              <Link
                href={`/todolist/profile/${username}`}
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500 transition-colors"
              >
                Profile
              </Link>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition-colors">
                <div className="flex">
                  <Icons.Login /> Login
                </div>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
