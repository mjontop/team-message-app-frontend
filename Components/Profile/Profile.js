import React, { useEffect, useState } from "react";
import style from "../../styles/Profile.module.css";
import NOTFOUND from "../NotFound";
import FullPageLoader from "../FullPageLoader";
import { useRouter } from "next/dist/client/router";
import getUserInfo from "../auth";
import getUsers from "./helper/ProfileHelper";
import Link from "next/link";

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({ data: {}, isLoading: false });
  const [isSameUser, setIsSameUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!!username) {
      setIsSameUser(getUserInfo().user.username === username);
      setUserData({ ...userData, isLoading: true });

      const { isLoggedIn } = getUserInfo();
      if (isLoggedIn) {
        setIsLoading(true);
        getUsers(username).then((data) => {
          setUserData({ data: data });
          setIsLoading(false);
        });
      }
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
        {!isLoading ? (
          <div className={style.userStats}>
            <div className={style.user_name_row}>
              <div className="px-2 fs-3">
                <strong>{username}</strong>
              </div>
              {isSameUser && <button onClick={handleLogout}>Log Out</button>}
            </div>
            <h2>Channels</h2>
            {userData.data && userData.data.channels && (
              <ol>
                {userData.data.channels.map((channel) => (
                  <li>
                    <Link href={`/channel/${channel._id}`}>
                      {JSON.stringify(channel.name)}
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
        ) : (
          <FullPageLoader />
        )}
      </div>
    </main>
  );
};

export default Profile;
