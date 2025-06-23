import { useAppSelector, useAppDispatch } from './redux'
import { AppState } from '@/store/store';
import { authService, CreateUserData, LoginData } from '@/services/authService';
import {ErroMessage} from "@/helps/errorMessagefirabase"
import { User } from 'firebase/auth';
import { 
  SET_ACTIVE_USER, 
  SET_DESACTIVE_USER, 
  SET_LOADING, 
  SET_ERROR, 
  CLEAR_ERROR,
  SET_TOKEN 
} from '@/store/auth';

export const useAuth = () => {
 const dispatch = useAppDispatch()
  const authState = useAppSelector((state: AppState) => state.auth);

  const register = async (userData: CreateUserData) => {
    try {
      dispatch(SET_LOADING(true));
      dispatch(CLEAR_ERROR());

      
      const result = await authService.createUser(userData);
      
      
      const backendUser = result.backendUser;
      
      dispatch(SET_ACTIVE_USER({
        id: result.firebaseUser.uid,
        name: backendUser.nome,
        email: backendUser.email,
        photo: result.firebaseUser.photoURL || '',
        phone: backendUser.telefone || '',  
        location: backendUser.endereco || '',
        token: result.token
      }));

      dispatch(SET_TOKEN(result.token));
      dispatch(SET_LOADING(false));

      return result;
    } catch (error: unknown) {
        let errorCode = "unknown";

  if (typeof error === "object" && error !== null && "code" in error) {
    errorCode = String((error as { code: string }).code) as keyof typeof ErroMessage;
  }

  dispatch(SET_ERROR(errorCode));
  dispatch(SET_LOADING(false));
  throw error;
    }
  };

  const login = async (loginData: LoginData) => {
    try {
      dispatch(SET_LOADING(true));
      dispatch(CLEAR_ERROR());

      
      const result = await authService.login(loginData);
      
     
      const backendUser = result.backendUser;
      
      dispatch(SET_ACTIVE_USER({
        id: result.firebaseUser.uid,
        name: backendUser.nome,
        email: backendUser.email,
        photo: result.firebaseUser.photoURL || '',
        phone: backendUser.telefone || '',
        location: backendUser.endereco || '',
        token: result.token
      }));

      dispatch(SET_TOKEN(result.token));
      dispatch(SET_LOADING(false));

      return result;
    } catch (error: unknown) {
     let errorCode = "unknown";

  if (typeof error === "object" && error !== null && "code" in error) {
    errorCode = String((error as { code: string }).code) as keyof typeof ErroMessage;
  }

  dispatch(SET_ERROR(errorCode));
  dispatch(SET_LOADING(false));
  throw error;
    }
  };

  const logout = async () => {
    try {
      dispatch(SET_LOADING(true));
      
      await authService.logout();
      dispatch(SET_DESACTIVE_USER());
      dispatch(SET_LOADING(false));
    } catch (error: unknown) {
       let errorCode = "unknown";

  if (typeof error === "object" && error !== null && "code" in error) {
    errorCode = String((error as { code: string }).code) as keyof typeof ErroMessage;
  }

  dispatch(SET_ERROR(errorCode));
  dispatch(SET_LOADING(false));
  throw error;
    }
  };

  const clearError = () => {
    dispatch(CLEAR_ERROR());
  };

  const setUserFromFirebase = async (firebaseUser: User | null) => {
    if (firebaseUser) {
      try {
       
        const token = await authService.getCurrentToken();
        if (token) {
          dispatch(SET_TOKEN(token));
          
         
          const backendUser = await authService.getUserFromBackend(token);
          
          dispatch(SET_ACTIVE_USER({
            id: firebaseUser.uid,
            name: backendUser.nome,
            email: backendUser.email,
            photo: firebaseUser.photoURL || '',
            phone: backendUser.telefone || '',
            location: backendUser.endereco || '',
            token
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        dispatch(SET_ERROR('Erro ao carregar dados do usuário'));
      }
    } else {
      dispatch(SET_DESACTIVE_USER());
    }
  };

  
  const initializeAuthListener = () => {
    return authService.onAuthStateChange((user) => {
      setUserFromFirebase(user);
    });
  };

  
  const getCurrentUser = () => {
    return authService.getCurrentUser();
  };


  const getCurrentToken = async () => {
    return await authService.getCurrentToken();
  };

  
  const refreshUserData = async () => {
    try {
      dispatch(SET_LOADING(true));
      dispatch(CLEAR_ERROR());

      const backendUser = await authService.getUserFromBackend();
      const firebaseUser = authService.getCurrentUser();
      const token = await authService.getCurrentToken();

      if (firebaseUser && backendUser && token) {
        dispatch(SET_ACTIVE_USER({
          id: firebaseUser.uid,
          name: backendUser.nome,
          email: backendUser.email,
          photo: firebaseUser.photoURL || '',
          phone: backendUser.telefone || '',
          location: backendUser.endereco || '',
          token
        }));
      }

      dispatch(SET_LOADING(false));
      return backendUser;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao buscar dados do usuário';
      dispatch(SET_ERROR(errorMessage));
      dispatch(SET_LOADING(false));
      throw error;
    }
  };

  return {
    ...authState,
    register,
    login,
    logout,
    clearError,
    setUserFromFirebase,
    initializeAuthListener,
    getCurrentUser,
    getCurrentToken,
    refreshUserData
  };
};