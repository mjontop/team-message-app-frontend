import Axios from "../../../utils/Axios";

const getChannelInfo = async (channelId) => {
  try {
    const { data } = await Axios.get(`channel/getChannel/${channelId}`);
    return data;
  } catch (ex) {
    console.log("Error in Getting Channel");
    return {
      error: true,
      data: null,
    };
  }
};

export const getPostsOfChannel = async (channelId) => {
  try {
    const { data } = await Axios.get(`post/${channelId}`);
    return data;
  } catch (ex) {
    console.log("Error in Getting Posts");
    return {
      error: true,
      data: null,
    };
  }
};

// {{url}}/post/61976b64809f1c93da7bbd72
export default getChannelInfo;
