import axios from 'axios';
import {auth} from "@/lib/firebase";


const urlBase = "https://chef-burger-backend.onrender.com"
export const api = axios.create({
  baseURL: urlBase, 
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
  async (error) => {
    const isAuthError = error.response?.status === 401;
    const user = auth.currentUser;

   
    if (isAuthError && user) {
      console.warn("Token expirado ou inválido. Considerar redirecionar.");
      // auth.signOut(); // Só se quiser forçar logout
     /* if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }*/
    }

    return Promise.reject(error);
  }
);