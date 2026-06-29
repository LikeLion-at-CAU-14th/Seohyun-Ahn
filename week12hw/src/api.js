import axios from "axios";

const api = axios.create({
  baseURL: "https://week12-api-rcwo.onrender.com",
});

export default api;