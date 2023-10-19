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

  delete = (id) => {
    return this.api.delete("/api/services/" + id);
  };

  uploadImage = (file) => {
    return this.api.post("/api/upload", file);
  };

  request = (serviceId) => {
    return this.api.post("/api/requests/" + serviceId);
  };

  getMyRequest = () => {
    return this.api.get("/api/requests/user/");
  };

  deleteRequest = (requestId) => {
    return this.api.delete("/api/requests/" + requestId);
  };

  getServiceRequests = (serviceId) => {
    return this.api.get("/api/requests/service/" + serviceId);
  };

  servicesMe = () => {
    return this.api.get("/api/services/me");
  };

  updateRequest = (requestId, status) => {
    return this.api.put("/api/requests/" + requestId, { status });
  };

  createRating = (serviceId, requestBody) => {
    return this.api.post("/api/ratings/" + serviceId, requestBody);
  };

  updateService = (serviceId, requestBody) => {
    return this.api.put("/api/services/" + serviceId, requestBody);
  };

  deleteRating = (ratingId) => {
    return this.api.delete("/api/ratings/" + ratingId);
  };

  getRatingMe = () => {
    return this.api.get("/api/ratings/me/");
  };
}

const servicesServices = new ServicesServices();
export default servicesServices;
