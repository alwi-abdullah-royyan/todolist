// components/RouteGuard.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated, isAdminUser } from "./auth";

const RouteGuard = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const publicPaths = ["/login", "/register"];
    const adminPaths = ["/todolist/dashboard", "/todolist/dashboard/category", "/todolist/dashboard/all-todolist"]; // Define admin-only paths

    const pathIsPublic = publicPaths.includes(router.pathname);
    const pathIsAdmin = adminPaths.some((path) => router.pathname.startsWith(path));

    // Avoid unnecessary redirects for 404 page
    if (router.pathname === "/404") return;

    if (!isAuthenticated() && !pathIsPublic) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated() && pathIsPublic) {
      router.replace("/todolist");
      return;
    }
    console.log(pathIsAdmin);

    // 🔒 Admin-only route protection
    if (pathIsAdmin && !isAdminUser()) {
      console.log("in");

      router.replace("/403"); // Redirect to "Forbidden" page
      return;
    }
  }, [router.pathname]);

  return <>{children}</>;
};

export default RouteGuard;
