import Axios from "../../../utils/Axios";

const getUsers = async (username) => {
  try {
    const { data } = await Axios.get(`/user/getUser/${username}`);
    return data;
  } catch (ex) {
    console.log("Error in Getting email");
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

export default getUsers;
