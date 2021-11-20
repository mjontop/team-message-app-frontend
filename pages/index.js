import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import getUserInfo from "../Components/auth";
import Link from "next/link";
import FullPageLoader from "../Components/FullPageLoader";

const HomePage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
    const userInfo = getUserInfo();
    setIsLoggedIn(userInfo.isLoggedIn);
    setUser(userInfo.user);
    if (userInfo.isLoggedIn) {
      router.push(`/${userInfo.user.username}`);
    } else {
      router.push(`/accounts/register`);
    }
  }, []);

  return <FullPageLoader />;
};

export default HomePage;
