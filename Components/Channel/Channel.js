import React, { useEffect, useState } from "react";
import getChannelInfo, {
  getPostsOfChannel,
  joinChannel,
  sendMessage,
} from "./helper";
import style from "../../styles/Channel.module.css";
import FullpageLoader from "../FullPageLoader";
import Link from "next/link";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import getUserInfo from "../auth";
import { getTimeSince } from "./helper/timeCalculator";

const Channel = ({ channelId }) => {
  const [channedData, setChannelData] = useState({});
  const [channelPost, setChannelPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isJoined, setIsJoined] = useState(null);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (!!channelId) {
      setIsLoading(true);
      getChannelInfo(channelId).then((data) => {
        setChannelData(data.channel);
        handleCheckifJoined(data.channel);
        setIsLoading(false);
      });
      getPostsOfChannel(channelId).then((data) => {
        setChannelPost(data.post);
        setIsLoading(false);
      });
    }
  }, [channelId]);

  const handleCheckifJoined = (data) => {
    const { user } = getUserInfo();
    if ([...data.members, data.createdBy].includes(user.username)) {
      setIsJoined(true);
    }
  };

  const handleCopy = () => {
    const text = window.location.href;
    let paragraph = document.createElement("textarea");
    document.body.appendChild(paragraph);
    let span_ = document.createElement("span");
    span_.innerHTML = text;
    paragraph.value = span_.innerHTML;
    paragraph.select();
    document.execCommand("copy");
    document.body.removeChild(paragraph);

    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessage(channelId, newMessage).then((data) => {
      setNewMessage("");
      if (!data.error) {
        setChannelPost([...channelPost, data.post]);
      }
    });
  };

  const handleJoinChannel = () => {
    joinChannel(channelId).then((data) => {
      if (!data.error) {
        window.location.reload();
      }
    });
  };

  if (isLoading) {
    return <FullpageLoader />;
  }
  return (
    <main className="main">
      <div className={style.body}>
        <div className={style.head}>#{channedData.name}</div>
        <div className={style.created}>
          <div>
            <span className="px-1">Created By: </span>
            {channedData.createdBy && (
              <Link href={`/${channedData.createdBy}`}>
                {channedData.createdBy}
              </Link>
            )}
          </div>
          <div>
            <span className="px-1">Created On: </span>
            {new Date(channedData.createdAt).toDateString()}
          </div>
        </div>
        <div className={style.accordin}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <b>
                Members ({channedData.members && channedData.members.length})
              </b>
            </AccordionSummary>
            <AccordionDetails>
              {channedData.members && channedData.members.length > 0 ? (
                <ul>
                  <li>{channedData.createdBy}</li>
                  {channedData.members.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              ) : (
                <p>Only You</p>
              )}
            </AccordionDetails>
          </Accordion>
          <div className={style.invite} onClick={handleCopy}>
            {hasCopied ? "Copied" : "Share Invite Link"}
          </div>
        </div>
        <div className={style.message_body}>
          <div className="d-flex flex-column justify-content-center">
            <strong className="text-center text-purple fs-4">Messages</strong>
            <hr />
          </div>

          {channelPost.length > 0 ? (
            <div className={style.messageBox}>
              <div>
                {channelPost.map((post, index) => (
                  <div className={style.message} key={index}>
                    <div className={style.message_body_user}>
                      <b>
                        <Link href={`/${post.postedBy}`}>{post.postedBy}</Link>
                      </b>
                      <p className="pt-1">{post.message}</p>
                    </div>
                    <div>
                      <small>{getTimeSince(post.createdAt)}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center fs-2">
              <b> This Chat has No Conversetion Yet </b>
            </div>
          )}
          {!isJoined ? (
            <div className={style.join} onClick={handleJoinChannel}>
              Join
            </div>
          ) : (
            <div className={style.newMessage}>
              <textarea
                placeholder="Write Message..."
                onChange={handleMessageChange}
                value={newMessage}
              />
              <button className="btn" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Channel;
