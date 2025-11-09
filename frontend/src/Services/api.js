import axios from "axios";

// const API_URL = 'http://localhost:3000'

// export const api = axios.create({
//     baseURL : API_URL
// })

const backendURL =  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"; 
const api = axios.create({
  withCredentials: true,
  baseURL: backendURL,
});


api.interceptors.response.use(                  // Interceptor to handle 401 responses
  response => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh" &&
      originalRequest.url !== "/login" 
    ) {
      originalRequest._retry = true;
      try {
        
        await api.post("/refresh", {}, { withCredentials: true });
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export { api }; 