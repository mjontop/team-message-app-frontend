import Axios from "../../utils/Axios";

const registerHelper = async (user) => {
  try {
    const { data } = await Axios.post("/user/signup", user);
    if (!data.error) {
      localStorage.setItem("token", data.token);
    }
    return data;
  } catch (ex) {
    console.log("Error in SignIn", ex);
    return {
      error: true,
      message: ex.response.data.message,
    };
  }
};

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateUsername(username) {
  return username.includes("@");
}

export default registerHelper;
