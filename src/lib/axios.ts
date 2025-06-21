import axios from 'axios';
import {auth} from "@/lib/firebase";

export const api = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador para lidar com erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      auth.signOut();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);