import axios from "axios";

const api = axios.create({
  baseURL: "https://library.softly.uz",
});

export default api;
