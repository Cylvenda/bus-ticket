import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

const api = axios.create({
     baseURL: API_ENDPOINTS.API_ROOT,
     headers: { "Content-Type": "application/json" },
     withCredentials: true,
});

api.interceptors.response.use(
     (response) => response,

     async (error) => {
          if (error.response?.status === 401) {
               try {
                    // Try refresh
                    await api.post(API_ENDPOINTS.USER_TOKEN_REFRESH);

                    // Retry original request
                    return api(error.config);
               } catch (refreshError) {
                    return Promise.reject(refreshError);
               }
          }
          return Promise.reject(error);
     }
);

export default api;