import axios from "axios";

const app = axios.create({
  baseURL: "https://foodforconcentration.herokuapp.com/",
});

const getToken = () => {
  return localStorage.getItem("token");
};

app.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers["x-auth-token"] = token ? `${token}` : "";
  return config;
});

export { app };
