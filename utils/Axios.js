import axios from "axios";
const ISSERVER = typeof window === "undefined";

const Axios = axios.create({
  baseURL: "https://team-message-app-api.herokuapp.com/api",
  headers: {
    "x-auth-token": !ISSERVER ? localStorage.getItem("token") : "",
  },
});

export default Axios;
