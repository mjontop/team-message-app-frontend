import React, { useEffect, useState } from "react";
import style from "../../styles/Profile.module.css";
import NOTFOUND from "../NotFound";
import FullPageLoader from "../FullPageLoader";
import { useRouter } from "next/dist/client/router";
import getUserInfo from "../auth";
import getUsers from "./helper/ProfileHelper";
import Link from "next/link";
import { AddOutlined } from "@material-ui/icons";

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
        {!isLoading ? (
          <div>
            <div>
              <div className="fs-3">
                Hello, <strong>{username}</strong>
                {isSameUser && (
                  <button
                    className="btn btn-danger mx-3"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                )}
              </div>
            </div>
            <hr />
            <div className={style.channel}>
              <div>
                <b>Channels</b>
                {userData.data && userData.data.channels && (
                  <ol>
                    {userData.data.channels.map((channel) => (
                      <li>
                        <Link href={`/channel/${channel._id}`}>
                          {channel.name}
                        </Link>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
              <div className="d-flex flex-column align-items-center">
                <input />
                <span className="btn btn-ouline-danger mt-1">
                  Create New Channel <AddOutlined />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <FullPageLoader />
        )}
      </div>
    </main>
  );
};

export default Profile;
