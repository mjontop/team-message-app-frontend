import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import getUserInfo from "../Components/auth";
import Link from "next/link";
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
  }, []);

  return (
    <>
      Hello
      {isLoggedIn ? (
        <Link href={`/${user.username}`}>
          <a>{user.username}</a>
        </Link>
      ) : (
        <>
          <Link href={`/accounts/login`}>
            <a>Login</a>
          </Link>
          OR
          <Link href={`/accounts/register`}>
            <a>Register</a>
          </Link>
        </>
      )}
    </>
  );
};

export default HomePage;
