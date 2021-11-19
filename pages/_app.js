import { useEffect, useState } from "react";
import getUserInfo from "../Components/auth";
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  const [profilePic, setProfilePic] = useState("");
  const loadUser = async () => {
    const userInfo = getUserInfo();
    if(!getUserInfo().isLoggedIn){
      
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} profilePic={profilePic} />
    </>
  );
}

export default MyApp;
