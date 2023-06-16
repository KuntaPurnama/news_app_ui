import a from "axios";

const axios = a.create({
  withCredentials: true,
});

export default axios;
