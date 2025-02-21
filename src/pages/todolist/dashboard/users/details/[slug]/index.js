import { useRouter } from "next/router";
import React from "react";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import UserDetails from "@/components/organism/UserDetail";

const UserDetailsPage = () => {
  const api = process.env.NEXT_PUBLIC_API_TODOLIST;
  const router = useRouter();
  const { slug } = router.query;

  const { users, loading: loadingUser, error: fetchError } = useFetchUsers(api, 0, null, slug);

  const { deleteUser, loading: loadingDelete, error: deleteError } = useDeleteUser(api);

  const user = users.length > 0 ? users[0] : null;

  if (loadingUser) {
    return <p className="text-center text-gray-500">Loading user details...</p>;
  }

  if (fetchError) {
    return <p className="text-center text-red-500">{fetchError}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <UserDetails user={user} deleteError={deleteError} deleteUser={deleteUser} />
    </div>
  );
};

export default UserDetailsPage;
