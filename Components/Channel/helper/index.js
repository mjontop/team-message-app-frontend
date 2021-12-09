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

export const joinChannel = async (channelId) => {
  try {
    const { data } = await Axios.post(`channel/joinChannel/${channelId}`);
    return data;
  } catch (ex) {
    console.log("Error in Creating Posts");
    return {
      error: true,
      data: null,
    };
  }
};

export const sendMessage = async (channelId, message) => {
  try {
    const { data } = await Axios.post(`post/createPost`, {
      channelId,
      message,
    });
    return data;
  } catch (ex) {
    console.log("Error in sending message");
    return {
      error: true,
      data: null,
    };
  }
};

export const createNewChannel = async (channel) => {
  try {
    const { data } = await Axios.post(`/channel/createChannel`, channel);
    return data;
  } catch (ex) {
    console.log("Error in Creating User");
    return {
      error: true,
      data: null,
    };
  }
};

export default getChannelInfo;
