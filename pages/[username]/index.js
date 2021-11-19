import { useRouter } from "next/dist/client/router";
import React from "react";
import Profile from "../../Components/Profile/Profile";

const UserProfile = () => {
  const router = useRouter();
  const username = router.query.username;
  return (
    <>
      <Profile username={username} />
    </>
  );
};

export default UserProfile;
