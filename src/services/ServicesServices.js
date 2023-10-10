import axios from "axios";

class ServicesServices {
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

  create = (requestBody) => {
    return this.api.post("/api/services", requestBody);
  };

  getServices = () => {
    return this.api.get("/api/services");
  };

  getService = (id) => {
    return this.api.get("/api/services/" + id);
  };
}

const servicesServices = new ServicesServices();
export default servicesServices;
