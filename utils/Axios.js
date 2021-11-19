import axios from "axios";
const ISSERVER = typeof window === "undefined";

//Local Env
// const Axios = axios.create({
//   baseURL: "http://localhost:8001/api",
//   headers: {
//     "x-auth-token": !ISSERVER ? localStorage.getItem("token") : "",
//   },
// });

// Deployed on Heroku
const Axios = axios.create({
  baseURL: "https://api-insta-app.herokuapp.com/api",
  headers: {
    "x-auth-token": !ISSERVER ? localStorage.getItem("token") : "",
  },
});

export default Axios;
