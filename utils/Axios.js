import axios from "axios";
const ISSERVER = typeof window === "undefined";

const Axios = axios.create({
  baseURL: "http://localhost:8001/api",
  headers: {
    "x-auth-token": !ISSERVER ? localStorage.getItem("token") : "",
  },
});

export default Axios;
