const parseJwt = (token) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (e) {
    return {
      username: null,
    };
  }
};

export default parseJwt;
