import Axios from "../../../utils/Axios";

const getChannelInfo = async (channelId) => {
  try {
    const { data } = await Axios.get(`channel/getChannel/${channelId}`);
    return data;
  } catch (ex) {
    console.log("Error in Getting email");
    return {
      error: true,
      data: null,
    };
  }
};

export default getChannelInfo;
