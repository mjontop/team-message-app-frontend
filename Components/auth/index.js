import parseJwt from "../../utils/validateJWT";

const getUserInfo = () => {
  let isLoggedIn = false;
  let user = {
    username: "",
    email: "",
  };
  const token = localStorage.getItem("token");
  if (!!token) {
    const decoded = parseJwt(token);
    if (!!decoded) {
      user = {
        username: decoded.username,
        email: decoded.email,
      };
      isLoggedIn = true;
    }
  }
  return {
    isLoggedIn,
    user,
  };
};

export default getUserInfo;
