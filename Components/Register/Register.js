import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import style from "../../styles/SignIn.module.css";
import Loader from "../Loader";
import registerHelper, {
  validateEmail,
  validateUsername,
} from "./registerHelper";
import parseJwt from "../../utils/validateJWT";
import Link from "next/link";
import { TextField } from "@material-ui/core";
import getUserInfo from "../auth";
import Logo from "../Logo/Logo";

const Register = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    isLoading: false,
  });

  const [error, setError] = useState({
    hasError: false,
    message: "",
    isEmailInvalid: false,
    isUsernameInvalid: false,
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
      hasError: false,
      message: "",
      isEmailInvalid: false,
      isUsernameInvalid: false,
    });
    setUserInfo((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleRegister = () => {
    setError({
      hasError: false,
      message: "",
      isEmailInvalid: false,
      isUsernameInvalid: false,
    });
    const { isLoading, ...user } = userInfo;
    console.log(validateEmail(userInfo.email));
    if (!validateEmail(userInfo.email)) {
      setError({
        ...error,
        isEmailInvalid: true,
      });
      return;
    }
    if (validateUsername(userInfo.username)) {
      setError({
        ...error,
        isUsernameInvalid: true,
      });
      return;
    }
    setUserInfo((prev) => ({ ...prev, isLoading: true }));
    registerHelper(user).then((data) => {
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
          <Logo />
          <p className="fs-1 text-center">
            <strong>Welcome</strong>
          </p>
          <div className={style.login_inputs}>
            <TextField
              error={error.isEmailInvalid}
              id="standard-error-helper-text"
              label="Email"
              variant="standard"
              className="mb-4"
              onChange={handleChange("email")}
              helperText={error.isEmailInvalid ? "Invalid Email Address" : ""}
            />

            <TextField
              error={error.isUsernameInvalid}
              id="standard-error-helper-text"
              label="username"
              variant="standard"
              onChange={handleChange("username")}
              helperText={
                error.isUsernameInvalid ? "username cannot contains '@'" : ""
              }
            />
            <TextField
              id="standard-error-helper-text"
              label="Password"
              variant="standard"
              type="password"
              className="mt-4"
              onChange={handleChange("password")}
            />
            {error.hasError && (
              <p className="mt-5 mb-1 text-danger">{error.message}</p>
            )}
          </div>
          <div className={style.login_btn}>
            {!userInfo.isLoading ? (
              <button className="btn btn-secondary" onClick={handleRegister}>
                Register
              </button>
            ) : (
              <Loader />
            )}
          </div>
          <hr />
          <div className={style.footer}>
            <span>Already Registered ?</span>
            <Link href="/accounts/login">
              <span className={`${style.footer_btn} btn`}>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
