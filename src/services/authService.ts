import { auth } from '@/lib/firebase';
import { api } from '@/lib/axios';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged
} from 'firebase/auth';

export interface CreateUserData {
  email: string;
  password: string;
  phone: string;
  endereco: string;
  nome?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Criar usuário no Firebase e no backend
  async createUser(data: CreateUserData) {
    try {
      // 1. Criar usuário no Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      );
      
      const firebaseUser = userCredential.user;
      
      // 2. Obter token do Firebase
      const token = await firebaseUser.getIdToken();
      
      // 3. Criar usuário no backend
      const backendResponse = await api.post('/clientes', {
        nome: data.nome || firebaseUser.displayName || 'Usuário',
        email: data.email,
        telefone: data.phone,
        endereco: data.endereco
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return {
        firebaseUser,
        backendUser: backendResponse.data,
        token
      };
    } catch (error: any) {
      // Se falhar no backend, deletar usuário do Firebase
      if (auth.currentUser) {
        await auth.currentUser.delete();
      }
      throw error;
    }
  },

  // Login
  async login(data: LoginData) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      );
      
      const token = await userCredential.user.getIdToken();
      
      // Buscar dados do usuário no backend
      const backendResponse = await api.get('/clientes/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return {
        firebaseUser: userCredential.user,
        backendUser: backendResponse.data,
        token
      };
    } catch (error) {
      throw error;
    }
  },

  // Logout
  async logout() {
    return await signOut(auth);
  },

  // Obter token atual
  async getCurrentToken() {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  },

  // Buscar dados do usuário no backend
  async getUserFromBackend(token?: string) {
    try {
      const authToken = token || await this.getCurrentToken();
      if (!authToken) {
        throw new Error('Token não encontrado');
      }

      const response = await api.get('/clientes/me', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  
  getCurrentUser() {
    return auth.currentUser;
  }
};