import { useRouter } from "next/dist/client/router";
import React from "react";
import Channel from "../../../Components/Channel/Channel";

const ChannelPage = () => {
  const router = useRouter();
  const channelId = router.query.channelId;
  return (
    <>
      <Channel channelId={channelId} />
    </>
  );
};

export default ChannelPage;
