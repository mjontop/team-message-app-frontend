import Axios from "../../../utils/Axios";

const getUsersFromUsername = async (username) => {
  try {
    const { data } = await Axios.get(`/user/getUserFromUsername/${username}`);
    return data;
  } catch (ex) {
    console.log("Error in Getting email");
    return {
      error: true,
      data: null,
    };
  }
};

export const updateUserProfile = async (updatedUser) => {
  try {
    const { data } = await Axios.post(`/user/updateProfile`, updatedUser);
    return data;
  } catch (ex) {
    console.log("Error in Updating User", ex);
    return {
      error: true,
      data: null,
    };
  }
};

export const getUsersConnections = async (email) => {
  try {
    const { data } = await Axios.post(`/connections/getAllConnectionsCount`, {
      email,
    });
    return data;
  } catch (ex) {
    console.log("Error in Getting Followers");
    return {
      error: true,
      data: null,
    };
  }
};

export const getFollowingStatus = async (username) => {
  try {
    const { data } = await Axios.post("connections/getFollowingStatus", {
      username,
    });
    return {
      follows: data.follows,
    };
  } catch (ex) {
    console.log("Error in getting Following Status", ex);
    return {
      follows: false,
    };
  }
};

export default getUsersFromUsername;
