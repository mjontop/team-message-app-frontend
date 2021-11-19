import React, { useEffect, useState } from "react";
import style from "../../styles/Profile.module.css";
import FullPageLoader from "../FullPageLoader";

import getUserInfo from "../auth";
import getUsers, { createNewChannel } from "./helper/ProfileHelper";
import Link from "next/link";
import { AddOutlined } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({ data: {}, isLoading: false });
  const [isSameUser, setIsSameUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newChannelName, setNewChannelName] = useState({
    name: "",
    description: "",
  });
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

  const handleCreateNewChannel = () => {
    if (newChannelName.name.trim() === "") return;
    if (newChannelName.description.trim() === "") return;
    createNewChannel(newChannelName).then((data) => {
      if (!data.error) {
        router.push(`/channel/${data.channel._id}`);
      }
    });
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
                <input
                  value={newChannelName.name}
                  onChange={(e) => {
                    setNewChannelName({
                      ...newChannelName,
                      name: e.target.value,
                    });
                  }}
                  placeholder="Channel Name"
                />
                <textarea
                  className="w-100 my-2"
                  onChange={(e) => {
                    setNewChannelName({
                      ...newChannelName,
                      description: e.target.value,
                    });
                  }}
                  value={newChannelName.description}
                  placeholder="Channel Desc..."
                />
                <span
                  className="btn btn-ouline-danger mt-1 w-100"
                  onClick={handleCreateNewChannel}
                >
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
