import React, { useEffect, useState } from "react";

import style from "../../styles/Profile.module.css";
import NOTFOUND from "../NotFound";
import FullPageLoader from "../FullPageLoader";
import { useRouter } from "next/dist/client/router";
import getUserInfo from "../auth";

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({ data: {}, isLoading: false });
  const [isSameUser, setIsSameUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postsCount, setPostCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!!username) {
      setIsSameUser(getUserInfo().user.username === username);
      setUserData({ ...userData, isLoading: true });

      const { isLoggedIn } = getUserInfo();
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  return (
    <main className={`main`}>
      <div className={style.header}>
        Hello
        <div className={style.userStats}>
          <div className={style.user_name_row}>
            <div className="px-2 fs-3">
              <strong>{username}</strong>
            </div>
            {isSameUser && <button onClick={handleLogout}>Log Out</button>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
