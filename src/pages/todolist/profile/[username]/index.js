import AuthLayout from "@/components/templates/AuthLayout";
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
