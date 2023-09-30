import axios from "axios";

class AuthServices {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
  };
}

const authServices = new AuthServices();
export default authServices;
