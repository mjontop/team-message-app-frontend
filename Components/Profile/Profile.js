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
      <div className={style.header}>
        {!isLoading ? (
          <div>
            <div className="d-flex justify-content-between">
              <span className="fs-3">
                Hello, <strong>{username}</strong>
              </span>
              {isSameUser && (
                <button
                  className="btn btn-danger mx-3 float-right"
                  onClick={handleLogout}
                >
                  Log Out <ExitToAppRounded />
                </button>
              )}
            </div>
            <hr />
            <div className={style.channel}>
              <div>
                <b>Joined Channels</b>
                {userData.data && userData.data.channels && (
                  <ol>
                    {userData.data.channels.map((channel, index) => (
                      <li key={index}>
                        <Link href={`/channel/${channel._id}`}>
                          {channel.name}
                        </Link>
                      </li>
                    ))}
                  </ol>
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

                  {/* <textarea
                    
                    className="w-100 my-2"
                    onChange={(e) => {
                      setNewChannelName({
                        ...newChannelName,
                        description: e.target.value,
                      });
                    }}
                    value={newChannelName.description}
                    placeholder="Channel Desc..."
                  /> */}
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
