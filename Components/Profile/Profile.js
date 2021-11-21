import React, { useEffect, useState } from "react";
import style from "../../styles/Profile.module.css";
import FullPageLoader from "../FullPageLoader";
import getUserInfo from "../auth";
import getUsers, { createNewChannel } from "./helper/ProfileHelper";
import Link from "next/link";
import { AddOutlined, ExitToAppRounded } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";
import { TextField } from "@material-ui/core";

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
                        <span className="centered">
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
                <div className={style.channel_new_grp}>
                  <TextField
                    label="Channel Name"
                    variant="filled"
                    value={newChannelName.name}
                    onChange={(e) => {
                      setNewChannelName({
                        ...newChannelName,
                        name: e.target.value,
                      });
                    }}
                  />

                  <TextField
                    label="Description"
                    variant="filled"
                    multiline
                    onChange={(e) => {
                      setNewChannelName({
                        ...newChannelName,
                        description: e.target.value,
                      });
                    }}
                    value={newChannelName.description}
                    minRows={2}
                    className="my-2"
                  />

                  <button
                    className="btn-new outline white-purple"
                    onClick={handleCreateNewChannel}
                  >
                    Create New Channel <AddOutlined />
                  </button>
                </div>
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
