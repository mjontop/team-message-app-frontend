import React, { useEffect, useState } from "react";
import getChannelInfo, { getPostsOfChannel } from "./helper";
import style from "../../styles/Channel.module.css";
import FullpageLoader from "../FullPageLoader";
import Link from "next/link";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Channel = ({ channelId }) => {
  const [channedData, setChannelData] = useState({});
  const [channedPost, setChannelPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!!channelId) {
      setIsLoading(true);
      getChannelInfo(channelId).then((data) => {
        setChannelData(data.channel);
        setIsLoading(false);
      });
      getPostsOfChannel(channelId).then((data) => {
        setChannelPost(data.post);
        setIsLoading(false);
      });
    }
  }, [channelId]);
  if (isLoading) {
    return <FullpageLoader />;
  }
  return (
    <main className="main">
      <div className={style.body}>
        <div className={style.head}>#{channedData.name}</div>
        <div className={style.created}>
          <div>
            Created By:
            {channedData.createdBy && (
              <Link href={`/${channedData.createdBy}`}>
                {channedData.createdBy}
              </Link>
            )}
          </div>
          <div>
            Created On:
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
              <b>Members</b>
            </AccordionSummary>
            <AccordionDetails>
              {channedData.members && channedData.members.length > 0 ? (
                <ul>
                  {channedData.members.map((member) => (
                    <li>{member}</li>
                  ))}
                </ul>
              ) : (
                <p>Only You</p>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
        <strong className="mt-4 mb-1 text-center text-purple">Message</strong>
        <div>
          {channedPost.map((post) => (
            <div className={style.message}>
              <div>
                <b>
                  <Link href={`/${post.postedBy}`}>{post.postedBy}</Link>
                </b>
                :<span className="px-1">{post.message}</span>
              </div>
              <div>
                <small className="text-muted">
                  {new Date(post.createdAt).toDateString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Channel;
