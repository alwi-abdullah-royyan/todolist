import { isAuthenticated } from "@/services/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/todolist");
    } else {
      router.push("/login");
    }
  }, [router]);
  return <div>Redirecting...</div>;
};

export default Index;
