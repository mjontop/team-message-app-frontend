import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { useRouter } from "next/router";

import style from "../../styles/SignIn.module.css";
import Loader from "../Loader";
import loginHelper from "./loginHelper";
import parseJwt from "../../utils/validateJWT";
import Link from "next/link";
import getUserInfo from "../auth";

const SignIn = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    isLoading: false,
  });

  const [error, setError] = useState({
    hasError: false,
    message: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      const decoded = parseJwt(token);
      if (!decoded) {
        localStorage.removeItem("token");
        return;
      }
      router.replace("/");
    }
  }, []);

  const handleChange = (name) => (e) => {
    setError({
      ...error,
      hasError: false,
    });
    setUserInfo((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleLogin = () => {
    setError({
      ...error,
      hasError: false,
    });
    const { isLoading, ...user } = userInfo;
    setUserInfo((prev) => ({ ...prev, isLoading: true }));
    loginHelper(user).then((data) => {
      if (data.error) {
        setError({
          hasError: true,
          message: data.message,
        });
        setUserInfo((prev) => ({ ...prev, isLoading: false }));
        return;
      }
      const { user } = getUserInfo();
      window.location.replace(`/${user.username}`);
    });
  };

  return (
    <main className="main">
      <div className={style.container}>
        <div className={style.login_body}>
          <p className="fs-1 text-center">
            <strong>Welcome</strong>
          </p>
          <div className={style.login_inputs}>
            <TextField
              id="standard-error-helper-text"
              label="Email or Username"
              variant="standard"
              className="mb-4"
              onChange={handleChange("email")}
            />
            <TextField
              id="standard-error-helper-text"
              label="Password"
              variant="standard"
              type="password"
              onChange={handleChange("password")}
            />
            {error.hasError && (
              <p className="mt-5 mb-1 text-danger">{error.message}</p>
            )}
          </div>
          <div className={style.login_btn}>
            {!userInfo.isLoading ? (
              <button className="btn btn-secondary" onClick={handleLogin}>
                Login
              </button>
            ) : (
              <Loader />
            )}
          </div>
          <hr />
          <div className={style.footer}>
            <span>Not Registered Yet?</span>
            <Link href="/accounts/register">
              <span className={`${style.footer_btn} btn`}>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
