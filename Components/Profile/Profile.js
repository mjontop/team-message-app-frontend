import React, { useEffect, useState } from "react";
import style from "../../styles/Profile.module.css";
import FullPageLoader from "../FullPageLoader";
import getUserInfo from "../auth";
import getUsers from "./helper/ProfileHelper";
import Link from "next/link";
import { ExitToAppRounded } from "@material-ui/icons";
import NOTFound from "../NotFound";
import NewChannel from "../Channel/NewChannel";
import AddOutlined from "@material-ui/icons/AddOutlined";

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({ data: {}, error: false });
  const [isSameUser, setIsSameUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [creatingChannel, setCreatingChannel] = useState(false);

  useEffect(() => {
    if (!!username) {
      setIsSameUser(getUserInfo().user.username === username);
      setUserData({ ...userData, isLoading: true });

      const { isLoggedIn } = getUserInfo();
      if (isLoggedIn) {
        setIsLoading(true);
        getUsers(username).then((data) => {
          if (data.error) {
            setUserData({ ...userData, error: true });
          } else {
            setUserData({ ...userData, data: data });
          }
          setIsLoading(false);
        });
      }
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  if (userData.error) {
    return <NOTFound />;
  }

  return (
    <main className="main">
      <div className={style.container}>
        {!isLoading ? (
          <div className={style.content}>
            <div className="d-flex justify-content-between">
              <span className="fs-3">
                Hello, <strong>{username}</strong>
              </span>
              {isSameUser && (
                <button
                  className="btn-new purple-white px-3"
                  onClick={handleLogout}
                >
                  <span>Log Out</span> <ExitToAppRounded />
                </button>
              )}
            </div>
            <hr />
            <div className={style.channel}>
              <div>
                <b>
                  Joined Channels (
                  {userData.data &&
                    userData.data.channels &&
                    userData.data.channels.length}
                  )
                </b>
                {userData.data && userData.data.channels && (
                  <div className={style.joined_channel_grp}>
                    {userData.data.channels.map((channel, index) => (
                      <div key={index} className={style.joined_channel_item}>
                        <span>‣ </span>
                        <span className="">
                          #
                          <Link href={`/channel/${channel._id}`}>
                            {channel.name}
                          </Link>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {isSameUser && (
                <>
                  {!creatingChannel ? (
                    <div>
                      <button
                        className="btn-new outline white-purple"
                        onClick={() => setCreatingChannel(true)}
                        style={{ height: "3rem", width: "100%", padding: 0 }}
                      >
                        Create New Channel <AddOutlined />
                      </button>
                    </div>
                  ) : (
                    <NewChannel />
                  )}
                </>
              )}
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
