import Axios from "../../utils/Axios";

const loginHelper = async (user) => {
  try {
    const { data } = await Axios.post("/user/signin", user);
    if (!data.error) {
      localStorage.setItem("token", data.token);
    }
    return data;
  } catch (ex) {
    console.log("Error in SignIn", ex.response.data);
    return {
      error: true,
      message: ex.response.data.message,
    };
  }
};

export default loginHelper;
